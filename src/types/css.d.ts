// src/types/css.d.ts
// ============================================================
//  CSS MODULE TYPE DECLARATIONS
//  TypeScript doesn't understand CSS module imports by default.
//  This file tells TS: "any .module.css file exports an object
//  where keys are class names and values are strings."
//
//  Without this file you get:
//    TS2307: Cannot find module './Button.module.css'
// ============================================================

declare module '*.module.css' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.module.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.module.sass' {
  const styles: { [className: string]: string };
  export default styles;
}
