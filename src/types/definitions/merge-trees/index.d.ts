declare module 'merge-trees' {
	class MergeTrees {
		constructor(folders: [string, string], outDir: string);

		merge(): void;
	}

	export default MergeTrees;
}
