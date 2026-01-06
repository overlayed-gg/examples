import { Component } from "@angular/core";

@Component({
	selector: "app-root",
	standalone: true,
	template: `
		<div class="container draggable">
			<div class="card">
				<h1>Hello World</h1>
				<p>Overlayed Angular Example</p>
				<div class="status">
					<span class="dot"></span>
					<span>Ready for in-game overlay</span>
				</div>
			</div>
		</div>
	`,
	styles: [
		`
			.container {
				display: flex;
				justify-content: center;
				align-items: center;
				min-height: 100vh;
				padding: 2rem;
			}

			.card {
				background: rgba(255, 255, 255, 0.05);
				backdrop-filter: blur(10px);
				border: 1px solid rgba(255, 255, 255, 0.1);
				border-radius: 16px;
				padding: 3rem 4rem;
				text-align: center;
				box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
			}

			h1 {
				font-size: 2.5rem;
				font-weight: 600;
				margin-bottom: 0.5rem;
				background: linear-gradient(90deg, #a855f7, #3b82f6);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				background-clip: text;
			}

			p {
				color: #94a3b8;
				font-size: 1.1rem;
				margin-bottom: 1.5rem;
			}

			.status {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 0.5rem;
				color: #22c55e;
				font-size: 0.875rem;
			}

			.dot {
				width: 8px;
				height: 8px;
				background: #22c55e;
				border-radius: 50%;
				animation: pulse 2s ease-in-out infinite;
			}

			@keyframes pulse {
				0%,
				100% {
					opacity: 1;
				}
				50% {
					opacity: 0.5;
				}
			}
		`,
	],
})
export class AppComponent {}

