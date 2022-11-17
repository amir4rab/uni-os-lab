import { useEffect, useState } from "preact/hooks";

const useDialogSupported = () => {
  const [dialogIsSupported, setDialogIsSupported] = useState<null | boolean>(
    null,
  );

  // Checks if dialog component is supported
  useEffect(() => {
    if (window !== undefined)
      setDialogIsSupported(typeof HTMLDialogElement === 'function');
  }, []);

  return dialogIsSupported;
}

export default useDialogSupported;