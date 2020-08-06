const zip = (arr1: any[], arr2: any[]) => {
	return arr1.map((el, idx) => [el, arr2[idx]])
}

const sortAsc = (fn: (x: any) => any) => (a: any, b: any) =>
	Number(fn(b)) - Number(fn(a))

export { zip, sortAsc }
