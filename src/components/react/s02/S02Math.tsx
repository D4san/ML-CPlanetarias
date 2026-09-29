import MathExpression from '../MathExpression';

type S02MathProps = {
  tex: string;
  label: string;
  block?: boolean;
  className?: string;
};

export default function S02Math({ tex, label, block = false, className }: S02MathProps) {
  const classes = ['s02-math', block ? 's02-math--block' : 's02-math--inline', className]
    .filter(Boolean)
    .join(' ');

  return <MathExpression block={block} className={classes} label={label} tex={tex} />;
}
