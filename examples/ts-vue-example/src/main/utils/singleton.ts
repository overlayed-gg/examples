export type Singleton<T extends new (...args: any[]) => any> = T & {
	getInstance: () => InstanceType<T>;
	clearInstance: () => void;
};

export function AsSingleton<T extends new (...args: any[]) => any>(Aclass: T, ...args: ConstructorParameters<T>) {
	const Singleton = class extends Aclass {
		static _instance?: InstanceType<T>;
		/**
		 * Lazy get the static instance
		 */
		public static getInstance(): InstanceType<T> {
			if (!this._instance) {
				this._instance = new Aclass(...args);
			}
			return this._instance!;
		}

		/**
		 * Release the instance (most of the time you won't need this)
		 */
		public static clearInstance(): void {
			this._instance = undefined;
		}
	};
	// make the constructor private
	return Singleton as Singleton<T>;
}
