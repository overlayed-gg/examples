import { overlay } from "../overlayed";
import { type LoggerScope } from "@overlayed/app";
import EventEmitter from "events";

/** This should be kept in sync with EventEmitterManager */
export class Manager {
	protected logger: LoggerScope;
	public initialized = false;

	constructor(name: string) {
		this.logger = overlay.log.scope(name);
	}

	public init(): this {
		this.logger.log("Initializing");
		this.initialized = true;
		return this;
	}

	public destroy(): void {
		this.logger.log("Destroying");
		this.initialized = false;
	}
}

/** This should be kept in sync with EventEmitterManager */
export class EventEmitterManager<T extends Record<string, any>> extends EventEmitter<T> {
	protected logger: LoggerScope;
	public initialized = false;

	constructor(name: string) {
		super();
		this.logger = overlay.log.scope(name);
	}

	public init(): this {
		this.logger.log("Initializing");
		this.initialized = true;
		return this;
	}

	public destroy(): void {
		this.logger.log("Destroying");
		this.initialized = false;
		this.removeAllListeners();
	}
}
