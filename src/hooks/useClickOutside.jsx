import { useEffect } from "react";


function useOnClickOutside(ref, handler, id) {
	useEffect(
		() => {
			const listener = (event) => {
				if (!ref.current || ref.current.contains(event.target) || event.target.id === id) {
					return;
				}
				handler(event);
			};
			document.addEventListener("mousedown", listener);
			document.addEventListener("touchstart", listener);
			return () => {
				document.removeEventListener("mousedown", listener);
				document.removeEventListener("touchstart", listener);
			};
		},
		[ref, handler]
	);
}

export { useOnClickOutside };