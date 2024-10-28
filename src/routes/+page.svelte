<script>
	import MonacoEditor from '$lib/editor/MonacoEditor.svelte';
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<div class="editor-container">
	<MonacoEditor
		value="~This is a regular atom with [an enveloped content] in it

~Another atom with [multiple] [enveloped] [contents]"
		language="genesis"
		theme="genesis-theme"
	/>
	<nav class="navbar">
		<ul class="navbar-nav">
			<li class="logo">
				<a href="/" class="nav-main">
					<span class="link-text logo-text">genesis</span>
					<svg
						aria-hidden="true"
						focusable="false"
						data-prefix="fad"
						data-icon="angle-double-right"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
						class="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
					>
						<g class="fa-group">
							<path
								fill="currentColor"
								d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
								class="fa-secondary"
							></path>
							<path
								fill="currentColor"
								d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
								class="fa-primary"
							></path>
						</g>
					</svg>
				</a>
			</li>

			<li class="nav-item">
				<a href="/" class="nav-link">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="nav-icon">
						<path
							class="fa-secondary"
							d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
							fill="currentColor"
						/>
					</svg>
					<span class="link-text">New Genesis</span>
				</a>
			</li>

			<li class="nav-item">
				<a href="/" class="nav-link">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="nav-icon"
						fill="currentColor"
					>
						<path
							class="fa-secondary"
							d="M15 4H5v16h14V8h-4V4zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992z"
						/>
						<path class="fa-primary" d="M13 9h5L13 4v5z" />
					</svg>
					<span class="link-text">Unsaved Genesis</span>
				</a>
			</li>
		</ul>
	</nav>
</div>

<style>
	@import '$lib/navbar/navbar.css';
	:global(:root) {
		font-size: 16px;
		font-family: 'Open Sans';
		--transition-speed: 400ms;
	}
	:global(html, body) {
		margin: 0%;
		height: 100%;
	}

	@media only screen and (max-width: 600px) {
		:global(.editor-container) {
			padding-left: 0;
		}
	}

	:global(body)::-webkit-scrollbar {
		width: 0.25rem;
		height: 0.5rem;
	}

	:global(body)::-webkit-scrollbar-track {
		background: #1e1e24;
	}

	:global(body)::-webkit-scrollbar-thumb {
		background: #6644b8;
	}
</style>
