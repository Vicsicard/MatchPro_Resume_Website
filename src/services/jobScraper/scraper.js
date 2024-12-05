const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

// Assuming logError function and ERROR_TYPES, SEVERITY are defined elsewhere
const { logError, ERROR_TYPES, SEVERITY } = require('./errorHandler');

async function scrapeJobs(keywords) {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        const searchQuery = keywords.join(' ');
        const url = `https://www.indeed.com/jobs?q=${encodeURIComponent(searchQuery)}`;

        await page.goto(url);
        await page.waitForSelector('.job_seen_beacon', { timeout: 5000 });

        const content = await page.content();
        const $ = cheerio.load(content);
        const jobs = [];

        $('.job_seen_beacon').each((i, element) => {
            const title = $(element).find('.jobTitle').text().trim();
            const company = $(element).find('.companyName').text().trim();
            const location = $(element).find('.companyLocation').text().trim();
            const snippet = $(element).find('.job-snippet').text().trim();
            const link = 'https://www.indeed.com' + $(element).find('a').attr('href');
            
            if (title && company) {
                jobs.push({
                    title,
                    company,
                    location,
                    description: snippet,
                    url: link,
                    source: 'Indeed',
                    dateScraped: new Date().toISOString()
                });
            }
        });

        return jobs;
    } catch (error) {
        logError(error, ERROR_TYPES.NETWORK, SEVERITY.HIGH);
        return [];
    } finally {
        await browser.close();
    }
}

module.exports = { scrapeJobs };
