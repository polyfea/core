import { http, HttpResponse } from 'msw';

export const WelcomeTestStaticConfigHandler = [
  http.get('/polyfea/static-config', ({ request }) => {
    return HttpResponse.json({
      contextAreas: [
        {
          name: 'welcome',
          contextArea: {
            elements: [
              {
                microfrontend: 'welcome',
                tagName: 'welcome-element',
                attributes: {
                  welcome: 'Ahoj',
                },
                style: {
                  'background-color': 'blue',
                },
                priority: 10,
              },
              {
                tagName: 'input',
                attributes: {
                  value: 'This is a welcome context area rendered by Polyfea!',
                },
                style: {
                  'color': 'green',
                  'font-size': '20px',
                },
              },
            ],
          },
        },
      ],
      microfrontends: {
        welcome: {
          module: './welcome.js',
        },
      },
    });
  }),
  http.get('/polyfea/context-area/error', ({ request }) => {
    return new HttpResponse(null, { status: 404 });
  }),
  http.get('/polyfea/context-area/empty', ({ request }) => {
    return HttpResponse.json({
      elements: [],
    });
  }),
  http.get('/polyfea/context-area/shell', ({ request }) => {
    return HttpResponse.json({
      elements: [],
    });
  }),
  http.get('/polyfea/context-area/welcome', ({ request }) => {
    return HttpResponse.json({
      elements: [
        {
          microfrontend: 'welcome',
          tagName: 'welcome-element',
          attributes: {
            welcome: 'Ahoj',
          },
          style: {
            'background-color': 'blue',
          },
          priority: 10,
        },
        {
          tagName: 'input',
          attributes: {
            value: 'This is a welcome context area rendered by Polyfea!',
          },
          style: {
            'color': 'green',
            'font-size': '20px',
          },
        },
      ],
      microfrontends: {
        welcome: {
          module: './welcome.js',
        },
      },
    });
  }),
  http.get('/polyfea/context-area/module-error', ({ request }) => {
    return HttpResponse.json({
      elements: [
        {
          microfrontend: 'nix',
          tagName: 'nix-element',
        },
        {
          tagName: 'input',
          attributes: {
            value: 'Nix was here!',
          },
          style: {
            'color': 'green',
            'font-size': '20px',
          },
        },
      ],
      microfrontends: {
        nix: {
          module: './nix.js',
        },
      },
    });
  }),
  http.get('/polyfea/context-area/nix', ({ request }) => {
    return HttpResponse.json({
      elements: [
        {
          microfrontend: 'nix',
          tagName: 'nix-element',
        },
        {
          tagName: 'input',
          attributes: {
            value: 'Nix was here!',
          },
          style: {
            'color': 'green',
            'font-size': '20px',
          },
        },
      ],
      microfrontends: {
        notnix: {
          module: './nix.js',
        },
      },
    });
  }),
  http.get('/polyfea/context-area/cyclic', ({ request }) => {
    return HttpResponse.json({
      elements: [
        {
          microfrontend: 'cyclic',
          tagName: 'cyclic-element',
        },
      ],
      microfrontends: {
        cyclic: {
          module: './cycle.js',
        },
      },
    });
  }),
  http.get('/polyfea/context-area/navigate', ({ request }) => {
    let city = 'somewhere';

    let path = new URL(request.url).searchParams.get('path') || '/';
    switch (path) {
      case './france':
        city = 'Paris';
        break;
      case './germany':
        city = 'Berlin';
        break;
      case './slovakia':
        city = 'Bratislava';
        break;
    }
    let ctx = {
      elements: [
        {
          microfrontend: 'welcome',
          tagName: 'welcome-element',
          attributes: {
            welcome: 'Welcome to ',
            who: city,
          },
          style: {
            color: 'red',
          },
        },
      ],
      microfrontends: {
        welcome: {
          module: './welcome.js',
        },
      },
    };

    return HttpResponse.json(ctx);
  }),
];
