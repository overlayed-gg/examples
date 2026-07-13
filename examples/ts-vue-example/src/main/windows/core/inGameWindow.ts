import { type RenderWindow, type RenderWindowConstructorOptions } from "@overlayed/app";
import { CoreWindow, type CoreWindowOptions } from "./coreWindow";
import { overlay } from "../../overlayed";
import { deepMerge } from "../../utils/deepMerge";

export abstract class InGameWindow extends CoreWindow<RenderWindow> {
	private readonly _options: CoreWindowOptions = {
		browserWindow: {
			show: false,
			frame: false,
			webPreferences: {
				offscreen: true,
			},
		},
	};

	constructor(name: string) {
		super(name);
	}

	public override create(options: CoreWindowOptions) {
		super.create(deepMerge(this._options, options));
	}

	protected override getNewBrowserWindow(options: RenderWindowConstructorOptions) {
		return overlay.windows.createInGameWindow(options);
	}
}
