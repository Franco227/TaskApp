import { RotateCw } from "lucide-react";

interface Props {
  error: string;
  onRetry: () => void;
}

export function ErrorMessage({ error, onRetry }: Props) {
  return <div>
    <p style={{ color: 'red' }}>Error: {error}</p>
    <RotateCw className="button-refresh" onClick={onRetry} />
  </div>;
}
