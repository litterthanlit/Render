import { ValidationResult, ValidationRule } from "@/lib/types";

export function runValidationRules(
  documentRef: Document,
  windowRef: Window,
  rules: ValidationRule[]
): ValidationResult[] {
  return rules.map((rule) => {
    try {
      switch (rule.type) {
        case "selector-exists": {
          const found = documentRef.querySelector(rule.selector);
          return {
            rule,
            passed: Boolean(found),
            detail: found ? "Found required element." : "Required element is missing."
          };
        }
        case "selector-count": {
          const count = documentRef.querySelectorAll(rule.selector).length;
          return {
            rule,
            passed: count === rule.count,
            detail: `Expected ${rule.count}, found ${count}.`
          };
        }
        case "text-equals": {
          const node = documentRef.querySelector(rule.selector);
          const text = node?.textContent?.trim() ?? "";
          return {
            rule,
            passed: text === rule.text,
            detail: node ? `Found "${text}".` : "Required element is missing."
          };
        }
        case "has-class": {
          const node = documentRef.querySelector(rule.selector);
          return {
            rule,
            passed: Boolean(node?.classList.contains(rule.className)),
            detail: node
              ? `Class list is "${node.className}".`
              : "Required element is missing."
          };
        }
        case "style-equals": {
          const node = documentRef.querySelector(rule.selector);
          const value = node
            ? windowRef.getComputedStyle(node).getPropertyValue(rule.property).trim()
            : "";
          return {
            rule,
            passed: value === rule.value,
            detail: node ? `Computed value is "${value}".` : "Required element is missing."
          };
        }
        case "expression-returns": {
          const value = (
            windowRef as Window & { eval: (script: string) => unknown }
          ).eval(rule.expression);
          return {
            rule,
            passed: value === rule.expected,
            detail: `Expression returned ${String(value)}.`
          };
        }
        default: {
          return {
            rule,
            passed: false,
            detail: "Unsupported validation rule."
          };
        }
      }
    } catch (error) {
      return {
        rule,
        passed: false,
        detail: error instanceof Error ? error.message : "Unknown validation error."
      };
    }
  });
}
