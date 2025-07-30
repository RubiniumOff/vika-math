class Logger {
	c = {
		default: '\x1b[0;0m',
		success: '\x1b[0;32m',
		error: '\x1b[0;31m',
		warning: '\x1b[0;33m',
		cron: '\x1b[0;36m'
	}

	async success(text, method) {
		const message = `${this.c['success']}${this.getCurrentTime()} |${method ? ' \x1b[1;32m' + method + ' |' : ''} \x1b[0;32m\x1b[3;32m${text}${this.c['default']}`;
		return console.log(message)
	}

	log(text, method) {
		return console.log(`${this.c['default']}${this.getCurrentTime()} |${method ? ' \x1b[1;39m' + method + ' |' : ''} \x1b[0;39m\x1b[3;39m${text}${this.c['default']}`)
	}

	async error(text, method) {
		const message = `${this.c['error']}${this.getCurrentTime()} |${method ? ' \x1b[1;31m' + method + ' |' : ''} \x1b[0;31m\x1b[3;31m${text}${this.c['default']}`;
		console.log(message)
	}

	async warning(text, method) {
		const message = `${this.c['warning']}${this.getCurrentTime()} |${method ? ' \x1b[1;33m' + method + ' |' : ''} \x1b[0;33m\x1b[3;33m${text}${this.c['default']}`;
		console.warn(message)
	}

	cron(text, cron) {
		return console.log(`${this.c['cron']}${this.getCurrentTime()} | CRON | \x1b[0;36m\x1b[3;36m${text}${this.c['default']}`)
	}

	route(text, method) {
		return console.log(`${this.c['cron']}${this.getCurrentTime()} | \x1b[1;36mrouter\x1b[0;36m | \x1b[1;36m${method}\x1b[0;36m => \x1b[3;36m${text}${this.c['default']}`)
	}

	getCurrentTime = () => {
		const now = new Date();
		const day = String(now.getDate()).padStart(2, '0');
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const year = String(now.getFullYear()).slice(-2);
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const seconds = String(now.getSeconds()).padStart(2, '0');

		return `[${day}.${month}.${year} ${hours}:${minutes}:${seconds}]`;
	}
}

module.exports = new Logger();