import katex from 'katex';

export interface MathExpressionProps {
  tex: string;
  label?: string;
  block?: boolean;
  className?: string;
}

export function MathExpression({ tex, label, block = false, className }: MathExpressionProps) {
  const baseClass = block ? 'math-expression math-expression--block' : 'math-expression';
  const combinedClass = className ? `${baseClass} ${className}` : baseClass;

  const html = katex.renderToString(tex, {
    displayMode: block,
    output: 'htmlAndMathml',
    throwOnError: false,
  });

  return (
    <span
      className={combinedClass}
      role="math"
      aria-label={label ?? tex}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default MathExpression;
