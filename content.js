// Content script - inject archive buttons
(function() {
	'use strict';

	// Navigate directly to archive.is
	function archiveUrl(url) {
		var archiveisurl = new URL("/", "https://archive.today");
		archiveisurl.searchParams.set('run', 1);
		archiveisurl.searchParams.set('url', url);
		window.location.href = archiveisurl.href;
	}

	// Create floating archive button for current page
	function createPageArchiveButton() {
		const button = document.createElement('div');
		button.id = 'archive-is-page-btn';
		button.innerHTML = '📄';
		button.title = 'Archive this page';
		button.style.cssText = `
			position: fixed;
			bottom: 20px;
			right: 20px;
			background: #ff6b35;
			color: white;
			padding: 6px;
			border-radius: 50%;
			font-size: 16px;
			cursor: pointer;
			z-index: 10000;
			box-shadow: 0 2px 5px rgba(0,0,0,0.2);
			border: none;
			width: 32px;
			height: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
		`;
		
		button.addEventListener('click', () => {
			archiveUrl(window.location.href);
		});
		
		document.body.appendChild(button);
	}

	// Check for subscription paywall and auto-reload
	function checkSubscriptionPaywall() {
		if (document.title.includes('Subscribe to read')) {
			console.log('Detected subscription paywall, reloading page...');
			setTimeout(() => {
				archiveUrl(window.location.href);
			}, 1000);
		}
	}

	// Initialize when page loads
	function init() {
		createPageArchiveButton();
		checkSubscriptionPaywall();
	}

	// Wait for page to load
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
