<script>
	import '../app.css';
</script>

<div class="min-h-screen flex flex-col">
	<header class="bg-gray-100 p-4">
		<h1 class="text-4xl font-bold text-center">AI Blog Summarizer</h1>
	</header>
	<main class="flex-grow">
		<slot />
	</main>
	<footer class="bg-gray-100 p-4 text-center">
		<p>&copy; 2024 all rights reserved</p>
	</footer>
</div>
