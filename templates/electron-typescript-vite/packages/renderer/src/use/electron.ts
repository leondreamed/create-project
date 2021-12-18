export function useElectron() {
	return (window as unknown as { electron: any }).electron;
}
