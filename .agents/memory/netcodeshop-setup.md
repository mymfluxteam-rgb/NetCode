---
name: NetCodeShop project setup
description: Notes on the imported NetCodeShop Vite/React site and its Replit setup behavior.
---

The imported Replit workspace may not have `node_modules` populated even when `package.json` and lockfiles are present; the Vite workflow then fails with `vite: not found` until dependencies are installed.

**Why:** The initial workflow failure was an environment setup issue, not an application-code issue.

**How to apply:** When the imported app fails before Vite starts, check for the local dependency tree and install the declared Node packages before changing app or workflow code.

The Replit Node package installer can resolve caret-ranged dependencies to newer compatible releases and rewrite the npm lockfile while populating `node_modules`.

**Why:** This is useful for recovering an empty imported dependency tree, but it can create unrelated manifest or lockfile drift during a startup fix.

**How to apply:** Review dependency-file changes after installation; preserve the imported manifest ranges unless an upgrade is explicitly part of the request.
