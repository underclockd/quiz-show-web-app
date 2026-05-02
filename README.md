# Trivia Show Web App

The live application is available at [triviashow.app](https://triviashow.app).

## Development

To contribute to this project, you'll need to install [Bun](https://bun.sh/).

### Installation

Once you've cloned the repo, install the dependencies:

```sh
bun install
```
To access the database, you need to use the
[Vercel CLI](https://vercel.com/docs/cli) to link your local repo:

```sh
bunx vercel link
```

After following the instructions, you're ready for local development.

### Running the App

To host the application locally:

```sh
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.
Hot-reloading is enabled, so your local changes will update the page automatically.

### Deployment

Vercel automatically deploys the application directly from the
[`master`](https://github.com/underclockd/quiz-show-web-app/tree/master)
branch. To make changes to the live application, just submit a pull request.
When it is approved, the site will be rebuilt and redeployed automatically.

If you have a seat in the organization, you can access the
[deployment dashboard](https://vercel.com/popes/quiz-show-web-app) to view
logs, database status, domain configuration, etc.