"use client";

import * as Babel from "@babel/standalone";
import { useEffect, useMemo, useRef, useState } from "react";

import { ReactRenderedCheck } from "@/lib/types";

export type RenderedCheckResult = {
  id: string;
  label: string;
  passed: boolean;
  message: string;
};

type ReactPreviewFrameProps = {
  code: string;
  fakeFileName: string;
  previewComponentName: string;
  renderedChecks: ReactRenderedCheck[];
  resetKey: number;
  checkKey: number;
  onResult: (result: {
    status: "idle" | "rendered" | "error";
    error: string | null;
    renderedText: string;
    checkResults: RenderedCheckResult[];
  }) => void;
};

function prepareCode(code: string, componentName: string) {
  return code
    .replace(/\bimport\s+type\s+[^;]+;?\s*/g, "")
    .replace(/\bimport\s+[^;]+from\s+["']react["'];?\s*/g, "")
    .replace(/export\s+default\s+function\s+([A-Za-z0-9_$]+)/g, "function $1")
    .replace(/export\s+default\s+([A-Za-z0-9_$]+)\s*;?/g, "")
    .concat(`\n\nwindow.__RenderPreviewComponent = typeof ${componentName} !== "undefined" ? ${componentName} : App;`);
}

function buildPreviewDocument(
  transformedCode: string,
  renderedChecks: ReactRenderedCheck[],
  shouldRunChecks: boolean
) {
  const escapedCode = JSON.stringify(transformedCode);
  const escapedChecks = JSON.stringify(renderedChecks);

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      body { margin: 0; min-height: 100vh; background: #f6f7f8; color: #0a0a0a; }
      #root { min-height: 100vh; padding: 32px; box-sizing: border-box; }
      .board { display: grid; gap: 16px; max-width: 760px; margin: 0 auto; }
      .project-card { display: grid; gap: 12px; padding: 22px; border: 1px solid rgba(10,10,10,.1); border-radius: 20px; background: #fff; box-shadow: 0 12px 28px rgba(15,23,42,.06); }
      .project-card.featured, .project-card.is-featured { border-color: rgba(37,99,235,.4); box-shadow: 0 18px 44px rgba(37,99,235,.12); }
      .status { width: fit-content; margin: 0; border-radius: 999px; background: rgba(37,99,235,.08); padding: 6px 10px; color: #1d4ed8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; }
      h1, h2, p { margin-top: 0; }
      h2 { margin-bottom: 0; font-size: 26px; line-height: 1.1; }
      a, button, .cta { width: fit-content; border: 0; border-radius: 999px; background: #111827; color: #fff; padding: 10px 14px; text-decoration: none; font: inherit; cursor: pointer; }
      .save-button { border: 1px solid rgba(10,10,10,.12); background: #fff; color: #111827; }
      .save-button.is-saved { background: #111827; color: #fff; }
      .render-error { color: #b91c1c; background: rgba(185,28,28,.08); border: 1px solid rgba(185,28,28,.18); border-radius: 16px; padding: 16px; white-space: pre-wrap; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      import React, { useEffect, useState } from "https://esm.sh/react@19.2.0";
      import { createRoot } from "https://esm.sh/react-dom@19.2.0/client";

      window.React = React;
      window.useEffect = useEffect;
      window.useState = useState;

      const checks = ${escapedChecks};
      const userCode = ${escapedCode};

      const send = (payload) => {
        window.parent.postMessage({ source: "render-react-preview", ...payload }, "*");
      };

      const safeMessage = (error) => {
        if (!error) return "Unknown runtime error";
        return String(error.message || error).slice(0, 700);
      };

      const runRenderedChecks = async () => {
        const results = [];
        for (const check of checks) {
          try {
            if (check.type === "text-includes") {
              results.push({
                id: check.id,
                label: check.label,
                passed: document.body.textContent.includes(check.text),
                message: check.message
              });
            }
            if (check.type === "selector-count") {
              results.push({
                id: check.id,
                label: check.label,
                passed: document.querySelectorAll(check.selector).length >= check.count,
                message: check.message
              });
            }
            if (check.type === "selector-has-class") {
              const node = document.querySelector(check.selector);
              results.push({
                id: check.id,
                label: check.label,
                passed: Boolean(node && node.classList.contains(check.className)),
                message: check.message
              });
            }
            if (check.type === "click-text-change") {
              const node = document.querySelector(check.selector);
              const before = node?.textContent?.trim() || "";
              node?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
              await new Promise((resolve) => setTimeout(resolve, 140));
              const after = node?.textContent?.trim() || "";
              results.push({
                id: check.id,
                label: check.label,
                passed: before === check.beforeText && after === check.afterText,
                message: check.message
              });
            }
          } catch (error) {
            results.push({
              id: check.id,
              label: check.label,
              passed: false,
              message: safeMessage(error)
            });
          }
        }
        return results;
      };

      window.addEventListener("error", (event) => {
        send({ status: "error", error: safeMessage(event.error || event.message), renderedText: document.body.textContent || "", checkResults: [] });
      });

      try {
        (0, eval)(userCode);
        const Component = window.__RenderPreviewComponent;
        if (typeof Component !== "function") {
          throw new Error("Could not find the preview component. Check the component name.");
        }
        createRoot(document.getElementById("root")).render(React.createElement(Component));
        setTimeout(async () => {
          const checkResults = ${shouldRunChecks ? "await runRenderedChecks()" : "[]"};
          send({ status: "rendered", error: null, renderedText: document.body.textContent || "", checkResults });
        }, 80);
      } catch (error) {
        document.getElementById("root").innerHTML = '<div class="render-error"></div>';
        document.querySelector(".render-error").textContent = safeMessage(error);
        send({ status: "error", error: safeMessage(error), renderedText: document.body.textContent || "", checkResults: [] });
      }
    </script>
  </body>
</html>`;
}

export function ReactPreviewFrame({
  code,
  fakeFileName,
  previewComponentName,
  renderedChecks,
  resetKey,
  checkKey,
  onResult
}: ReactPreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [srcDoc, setSrcDoc] = useState("");

  const transformResult = useMemo(() => {
    try {
      const prepared = prepareCode(code, previewComponentName);
      const isTypeScript = /\.(ts|tsx)$/i.test(fakeFileName);
      const presets: Array<string | [string, Record<string, unknown>]> = [
        ["react", { runtime: "classic" }]
      ];
      if (isTypeScript) {
        presets.push(["typescript", { isTSX: true, allExtensions: true }]);
      }
      const result = Babel.transform(prepared, {
        filename: fakeFileName,
        presets,
        sourceType: "script"
      });
      return { code: result.code ?? "", error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not transform JSX.";
      return { code: "", error: message };
    }
  }, [code, fakeFileName, previewComponentName]);

  useEffect(() => {
    if (transformResult.error) {
      onResult({
        status: "error",
        error: transformResult.error,
        renderedText: "",
        checkResults: []
      });
      setSrcDoc(`<div style="font-family: system-ui; padding: 24px; color: #b91c1c;">${transformResult.error}</div>`);
      return;
    }

    onResult({ status: "idle", error: null, renderedText: "", checkResults: [] });
    setSrcDoc(buildPreviewDocument(transformResult.code, renderedChecks, checkKey > 0));
  }, [checkKey, onResult, renderedChecks, resetKey, transformResult]);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) {
        return;
      }

      const data = event.data as {
        source?: string;
        status?: "rendered" | "error";
        error?: string | null;
        renderedText?: string;
        checkResults?: RenderedCheckResult[];
      };

      if (data.source !== "render-react-preview" || !data.status) {
        return;
      }

      onResult({
        status: data.status,
        error: data.error ?? null,
        renderedText: data.renderedText ?? "",
        checkResults: data.checkResults ?? []
      });
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onResult]);

  return (
    <iframe
      ref={iframeRef}
      className="h-[460px] w-full border-0 bg-white"
      sandbox="allow-scripts"
      srcDoc={srcDoc}
      title="React live preview"
    />
  );
}
