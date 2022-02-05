export function useElectron() {
	return (window as unknown as { electron: unknown }).electron;
}
