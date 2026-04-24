import { CodeFiles } from "@/lib/types";

export function buildPreviewDocument(files: CodeFiles) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      :root {
        color-scheme: light;
      }
      html, body {
        margin: 0;
        min-height: 100%;
        font-family: ui-sans-serif, system-ui, sans-serif;
        background: #ffffff;
        color: #0a0a0a;
      }
      *, *::before, *::after {
        box-sizing: border-box;
      }
      ${files.css}
    </style>
  </head>
  <body>
    ${files.html}
    <script>
      window.__render = { ready: false };
      try {
        ${files.js}
        window.__render.ready = true;
      } catch (error) {
        window.__render.error = String(error);
        console.error(error);
      }
    </script>
  </body>
</html>`;
}
