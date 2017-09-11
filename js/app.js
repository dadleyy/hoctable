var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define("example/ghp/js/components/footer", ["require", "exports", "config/environment"], function (require, exports, env) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Footer() {
        var author = env.author, external_urls = env.external_urls;
        return (React.createElement("main", { className: "hero" },
            React.createElement("div", { className: "hero-body" },
                React.createElement("div", { className: "container level" },
                    React.createElement("div", { className: "level-left" },
                        React.createElement("p", null,
                            React.createElement("span", null, "\u00A9"),
                            React.createElement("span", null, new Date().getFullYear()),
                            " ",
                            React.createElement("span", null, author))),
                    React.createElement("div", { className: "level-right" },
                        React.createElement("a", { href: external_urls.github_project, className: "button is-info" },
                            React.createElement("i", { className: "ion-social-github icon is-medium" })))))));
    }
    exports.default = Footer;
});
define("example/ghp/js/var/en", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dictionary = {
        about: "About",
        about_hoctable: "About Hoctable",
        action: "Action",
        address: "Address",
        adventure: "Adventure",
        all: "All",
        all_categories: "All Categories",
        all_cities: "All Cities",
        all_cuisines: "All Cuisines",
        animation: "Animation",
        biography: "Biography",
        comedy: "Comedy",
        crime: "Crime",
        directors: "Directors",
        documentary: "Documentary",
        drama: "Drama",
        fantasy: "Fantasy",
        family: "Family",
        genres: "Genres",
        horror: "Horror",
        id: "ID",
        musical: "Musical",
        mystery: "Mystery",
        name: "Name",
        news: "News",
        no_results: "No results.",
        open: "Open",
        powered_by: "Powered By",
        project_title: "Hoctable",
        project_subtitle: "A library of composable components",
        rating: "Rating",
        release_date: "Release Date",
        runtime: "Runtime",
        romance: "Romance",
        sci_fi: "Science Fiction",
        search: "Search",
        search_cities: "Search Cities",
        search_restaurants: "Search Restaurants",
        search_titles: "Search Titles",
        selected: "Selected",
        select_genre: "All Genres (Select One)",
        something_went_wrong: "Something went wrong.",
        sport: "Sport",
        thriller: "Thriller",
        title: "Title",
        war: "War",
        western: "Western"
    };
    exports.default = dictionary;
});
define("example/ghp/js/services/i18n", ["require", "exports", "example/ghp/js/var/en"], function (require, exports, en_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function i18n(lookup) {
        var splits = lookup.split(".");
        var cursor = en_1.default;
        while (splits.length) {
            var step = splits.shift();
            if (false === cursor.hasOwnProperty(step))
                return lookup;
            cursor = cursor[step];
        }
        return cursor;
    }
    exports.default = i18n;
});
define("example/ghp/js/services/links", ["require", "exports", "config/environment"], function (require, exports, ENV) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function to(path) {
        var base = (ENV.routing || {}).base_url;
        return base ? "" + base + path : path;
    }
    exports.default = to;
});
define("example/ghp/js/components/header", ["require", "exports", "example/ghp/js/services/i18n", "example/ghp/js/services/links", "config/environment"], function (require, exports, i18n_1, links_1, ENV) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Header() {
        var external_urls = ENV.external_urls;
        return (React.createElement("section", { className: "hero is-dark" },
            React.createElement("div", { className: "hero-body" },
                React.createElement("div", { className: "container level" },
                    React.createElement("div", { className: "level-left" },
                        React.createElement("div", { className: "clearfix" },
                            React.createElement("h1", { className: "title" },
                                React.createElement("a", { href: links_1.default("home") }, i18n_1.default("project_title"))),
                            React.createElement("h2", { className: "subtitle" }, i18n_1.default("project_subtitle")))),
                    React.createElement("div", { className: "level-right" },
                        React.createElement("div", { className: "float-left margin-right-30" },
                            React.createElement("a", { href: links_1.default("about") }, i18n_1.default("about"))),
                        React.createElement("div", { className: "float-left" },
                            React.createElement("a", { href: external_urls ? external_urls.github_project : '/' },
                                React.createElement("i", { className: "ion-social-github icon fs-40" }))))))));
    }
    exports.default = Header;
});
define("example/ghp/js/views/error", ["require", "exports", "example/ghp/js/services/i18n"], function (require, exports, i18n_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Errored = /** @class */ (function (_super) {
        __extends(Errored, _super);
        function Errored() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Errored.prototype.render = function () {
            return (React.createElement("div", { className: "error-view container" },
                React.createElement("p", null, i18n_2.default("something_went_wrong"))));
        };
        return Errored;
    }(React.Component));
    exports.default = Errored;
});
define("example/ghp/js/router", ["require", "exports", "hoctable", "example/ghp/js/views/error"], function (require, exports, hoctable, error_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Example router
    //
    // Heavily inspired by angular's (v1.x) routing, this router expects the application to define routes in terms of a 
    // path, a view module (string) and a resolution function. Once the application's url matches the path provided by the
    // route, the router will call the route's `resolve` function, sending the pagejs route context into it. Upon 
    // successful resolution, the router will `require` the route's view module, rendering it with the resolution data into
    // the document's #main element.
    function el(id) {
        return document.getElementById(id);
    }
    var state = {};
    // @typedef {Object} Route
    // @property {string} path - The url pattern that the router will match against.
    // @property {function} resolve - A promise-returning function who's resolution will be sent into view initialization.
    // @property {string} view - The module path who's export will be initialzed and rendered into the document.
    var Router = {
        get active() {
            return state.active;
        },
        // @function register
        //
        // @param {Route} route - the route to register against pagejs internals
        register: function (route) {
            var view = route.view, path = route.path, resolve = route.resolve;
            var runtime = null;
            state.active = null;
            function render(_a) {
                var View = _a.default;
                var resolution = runtime.resolution;
                var instance = React.createElement(View, { resolution: resolution });
                state.active = { view: view, path: path };
                ReactDOM.render(instance, el("main"));
            }
            function load(resolution) {
                runtime = { resolution: resolution };
                // Lazy-load the route's view module & prepare to render
                require([view], render);
            }
            function failed(error) {
                // Allow routes to reject w/ redirects.
                if (error.code === 300 && error.url) {
                    return page(error.url);
                }
                console.error(error);
                ReactDOM.render(React.createElement(error_1.default, null), el("main"));
            }
            function begin(context) {
                resolve.call(context).then(load).catch(failed);
            }
            // Register our route entry with the pagejs internals.
            page(path, begin);
        },
        // @function start
        //
        // @param {string} base - The url base that the application will register with the pagejs api.
        start: function (base) {
            hoctable.services.Popups.mount(el("popups"));
            hoctable.services.Viewport.bind();
            page.base(base);
            // Hashbanging routing engine here for github page's lack of spa support.
            page.start({ hashbang: true });
        }
    };
    exports.default = Router;
});
define("example/ghp/js/services/defer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function resolve(resolution) {
        return Q.resolve(resolution);
    }
    function reject(resolution) {
        return Q.reject(resolution);
    }
    function defer(resolution) {
        return Q.defer();
    }
    exports.default = { resolve: resolve, reject: reject, defer: defer };
});
define("example/ghp/js/var/movies", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DATABASE = [{
            "position": 1,
            "const": "tt1190536",
            "created": "Sun Feb 14 01:50:16 2016",
            "modified": "Sun Feb 14 01:50:16 2016",
            "description": "",
            "title": "Black Dynamite",
            "type": "Feature Film",
            "directors": "Scott Sanders",
            "user_rating": 10,
            "imdb_rating": 7.4,
            "runtime": 84,
            "year": 2009,
            "genres": "action, comedy",
            "votes": 36703,
            "release_date": "2009-01-18",
            "url": "http://www.imdb.com/title/tt1190536/"
        }, {
            "position": 2,
            "const": "tt0387898",
            "created": "Sun Feb 14 01:50:16 2016",
            "modified": "Sun Feb 14 01:50:16 2016",
            "description": "",
            "title": "Caché",
            "type": "Feature Film",
            "directors": "Michael Haneke",
            "user_rating": 10,
            "imdb_rating": 7.3,
            "runtime": 117,
            "year": 2005,
            "genres": "drama, mystery, thriller",
            "votes": 55202,
            "release_date": "2005-05-14",
            "url": "http://www.imdb.com/title/tt0387898/"
        }, {
            "position": 3,
            "const": "tt2562232",
            "created": "Sun Feb 14 01:50:16 2016",
            "modified": "Sun Feb 14 01:50:16 2016",
            "description": "",
            "title": "Birdman or (The Unexpected Virtue of Ignorance)",
            "type": "Feature Film",
            "directors": "Alejandro G. Iñárritu",
            "user_rating": 10,
            "imdb_rating": 7.8,
            "runtime": 119,
            "year": 2014,
            "genres": "comedy, drama, romance",
            "votes": 412841,
            "release_date": "2014-08-27",
            "url": "http://www.imdb.com/title/tt2562232/"
        }, {
            "position": 4,
            "const": "tt0120737",
            "created": "Sun Feb 14 01:50:17 2016",
            "modified": "Sun Feb 14 01:50:17 2016",
            "description": "",
            "title": "The Lord of the Rings: The Fellowship of the Ring",
            "type": "Feature Film",
            "directors": "Peter Jackson",
            "user_rating": 10,
            "imdb_rating": 8.8,
            "runtime": 178,
            "year": 2001,
            "genres": "adventure, drama, fantasy",
            "votes": 1270828,
            "release_date": "2001-12-10",
            "url": "http://www.imdb.com/title/tt0120737/"
        }, {
            "position": 5,
            "const": "tt0401792",
            "created": "Sun Feb 14 01:50:17 2016",
            "modified": "Sun Feb 14 01:50:17 2016",
            "description": "",
            "title": "Sin City",
            "type": "Feature Film",
            "directors": "Frank Miller, Robert Rodriguez",
            "user_rating": 10,
            "imdb_rating": 8,
            "runtime": 124,
            "year": 2005,
            "genres": "crime, thriller",
            "votes": 669285,
            "release_date": "2005-03-28",
            "url": "http://www.imdb.com/title/tt0401792/"
        }, {
            "position": 6,
            "const": "tt0477348",
            "created": "Sun Feb 14 01:50:17 2016",
            "modified": "Sun Feb 14 01:50:17 2016",
            "description": "",
            "title": "No Country for Old Men",
            "type": "Feature Film",
            "directors": "Ethan Coen, Joel Coen",
            "user_rating": 10,
            "imdb_rating": 8.1,
            "runtime": 122,
            "year": 2007,
            "genres": "crime, drama, thriller",
            "votes": 631957,
            "release_date": "2007-05-19",
            "url": "http://www.imdb.com/title/tt0477348/"
        }, {
            "position": 7,
            "const": "tt0169547",
            "created": "Sun Feb 14 01:50:17 2016",
            "modified": "Sun Feb 14 01:50:17 2016",
            "description": "",
            "title": "American Beauty",
            "type": "Feature Film",
            "directors": "Sam Mendes",
            "user_rating": 10,
            "imdb_rating": 8.4,
            "runtime": 122,
            "year": 1999,
            "genres": "drama, romance",
            "votes": 844212,
            "release_date": "1999-09-08",
            "url": "http://www.imdb.com/title/tt0169547/"
        }, {
            "position": 8,
            "const": "tt2278388",
            "created": "Sun Feb 14 01:50:17 2016",
            "modified": "Sun Feb 14 01:50:17 2016",
            "description": "",
            "title": "The Grand Budapest Hotel",
            "type": "Feature Film",
            "directors": "Wes Anderson",
            "user_rating": 10,
            "imdb_rating": 8.1,
            "runtime": 99,
            "year": 2014,
            "genres": "adventure, comedy, drama",
            "votes": 498601,
            "release_date": "2014-02-06",
            "url": "http://www.imdb.com/title/tt2278388/"
        }, {
            "position": 9,
            "const": "tt0180093",
            "created": "Sun Feb 14 01:50:17 2016",
            "modified": "Sun Feb 14 01:50:17 2016",
            "description": "",
            "title": "Requiem for a Dream",
            "type": "Feature Film",
            "directors": "Darren Aronofsky",
            "user_rating": 10,
            "imdb_rating": 8.4,
            "runtime": 102,
            "year": 2000,
            "genres": "drama",
            "votes": 589251,
            "release_date": "2000-05-14",
            "url": "http://www.imdb.com/title/tt0180093/"
        }, {
            "position": 10,
            "const": "tt0081505",
            "created": "Sun Feb 14 01:50:17 2016",
            "modified": "Sun Feb 14 01:50:17 2016",
            "description": "",
            "title": "The Shining",
            "type": "Feature Film",
            "directors": "Stanley Kubrick",
            "user_rating": 10,
            "imdb_rating": 8.4,
            "runtime": 146,
            "year": 1980,
            "genres": "drama, horror",
            "votes": 629834,
            "release_date": "1980-05-23",
            "url": "http://www.imdb.com/title/tt0081505/"
        }, {
            "position": 11,
            "const": "tt0167260",
            "created": "Sun Feb 14 01:50:17 2016",
            "modified": "Sun Feb 14 01:50:17 2016",
            "description": "",
            "title": "The Lord of the Rings: The Return of the King",
            "type": "Feature Film",
            "directors": "Peter Jackson",
            "user_rating": 10,
            "imdb_rating": 8.9,
            "runtime": 201,
            "year": 2003,
            "genres": "adventure, drama, fantasy",
            "votes": 1248496,
            "release_date": "2003-12-01",
            "url": "http://www.imdb.com/title/tt0167260/"
        }, {
            "position": 12,
            "const": "tt1798709",
            "created": "Sun Feb 14 01:50:17 2016",
            "modified": "Sun Feb 14 01:50:17 2016",
            "description": "",
            "title": "Her",
            "type": "Feature Film",
            "directors": "Spike Jonze",
            "user_rating": 10,
            "imdb_rating": 8,
            "runtime": 126,
            "year": 2013,
            "genres": "drama, romance, sci_fi",
            "votes": 369575,
            "release_date": "2013-10-12",
            "url": "http://www.imdb.com/title/tt1798709/"
        }, {
            "position": 13,
            "const": "tt0457430",
            "created": "Sun Feb 14 01:50:17 2016",
            "modified": "Sun Feb 14 01:50:17 2016",
            "description": "",
            "title": "Pan's Labyrinth",
            "type": "Feature Film",
            "directors": "Guillermo del Toro",
            "user_rating": 10,
            "imdb_rating": 8.2,
            "runtime": 118,
            "year": 2006,
            "genres": "drama, fantasy, war",
            "votes": 480446,
            "release_date": "2006-05-27",
            "url": "http://www.imdb.com/title/tt0457430/"
        }, {
            "position": 14,
            "const": "tt2042568",
            "created": "Sun Feb 14 01:50:17 2016",
            "modified": "Sun Feb 14 01:50:17 2016",
            "description": "",
            "title": "Inside Llewyn Davis",
            "type": "Feature Film",
            "directors": "Ethan Coen, Joel Coen",
            "user_rating": 10,
            "imdb_rating": 7.4,
            "runtime": 104,
            "year": 2013,
            "genres": "drama, music",
            "votes": 100599,
            "release_date": "2013-05-19",
            "url": "http://www.imdb.com/title/tt2042568/"
        }, {
            "position": 15,
            "const": "tt0209144",
            "created": "Sun Feb 14 01:50:17 2016",
            "modified": "Sun Feb 14 01:50:17 2016",
            "description": "",
            "title": "Memento",
            "type": "Feature Film",
            "directors": "Christopher Nolan",
            "user_rating": 10,
            "imdb_rating": 8.5,
            "runtime": 113,
            "year": 2000,
            "genres": "mystery, thriller",
            "votes": 869471,
            "release_date": "2000-09-05",
            "url": "http://www.imdb.com/title/tt0209144/"
        }, {
            "position": 16,
            "const": "tt0364569",
            "created": "Sun Feb 14 01:50:18 2016",
            "modified": "Sun Feb 14 01:50:18 2016",
            "description": "",
            "title": "Oldboy",
            "type": "Feature Film",
            "directors": "Chan-wook Park",
            "user_rating": 10,
            "imdb_rating": 8.4,
            "runtime": 120,
            "year": 2003,
            "genres": "drama, mystery, thriller",
            "votes": 368257,
            "release_date": "2003-11-21",
            "url": "http://www.imdb.com/title/tt0364569/"
        }, {
            "position": 17,
            "const": "tt0469494",
            "created": "Sun Feb 14 01:50:18 2016",
            "modified": "Sun Feb 14 01:50:18 2016",
            "description": "",
            "title": "There Will Be Blood",
            "type": "Feature Film",
            "directors": "Paul Thomas Anderson",
            "user_rating": 10,
            "imdb_rating": 8.1,
            "runtime": 158,
            "year": 2007,
            "genres": "drama, history",
            "votes": 384849,
            "release_date": "2007-09-27",
            "url": "http://www.imdb.com/title/tt0469494/"
        }, {
            "position": 18,
            "const": "tt0062622",
            "created": "Sun Feb 14 01:50:18 2016",
            "modified": "Sun Feb 14 01:50:18 2016",
            "description": "",
            "title": "2001: A Space Odyssey",
            "type": "Feature Film",
            "directors": "Stanley Kubrick",
            "user_rating": 10,
            "imdb_rating": 8.3,
            "runtime": 149,
            "year": 1968,
            "genres": "adventure, mystery, sci_fi",
            "votes": 440496,
            "release_date": "1968-04-02",
            "url": "http://www.imdb.com/title/tt0062622/"
        }, {
            "position": 19,
            "const": "tt0167261",
            "created": "Sun Feb 14 01:50:18 2016",
            "modified": "Sun Feb 14 01:50:18 2016",
            "description": "",
            "title": "The Lord of the Rings: The Two Towers",
            "type": "Feature Film",
            "directors": "Peter Jackson",
            "user_rating": 10,
            "imdb_rating": 8.7,
            "runtime": 179,
            "year": 2002,
            "genres": "adventure, drama, fantasy",
            "votes": 1130839,
            "release_date": "2002-12-05",
            "url": "http://www.imdb.com/title/tt0167261/"
        }, {
            "position": 20,
            "const": "tt0378194",
            "created": "Sun Feb 14 01:50:18 2016",
            "modified": "Sun Feb 14 01:50:18 2016",
            "description": "",
            "title": "Kill Bill: Vol. 2",
            "type": "Feature Film",
            "directors": "Quentin Tarantino",
            "user_rating": 10,
            "imdb_rating": 8,
            "runtime": 137,
            "year": 2004,
            "genres": "action, crime, drama, thriller",
            "votes": 524790,
            "release_date": "2004-04-08",
            "url": "http://www.imdb.com/title/tt0378194/"
        }, {
            "position": 21,
            "const": "tt1019452",
            "created": "Sun Feb 14 01:50:18 2016",
            "modified": "Sun Feb 14 01:50:18 2016",
            "description": "",
            "title": "A Serious Man",
            "type": "Feature Film",
            "directors": "Ethan Coen, Joel Coen",
            "user_rating": 10,
            "imdb_rating": 7,
            "runtime": 106,
            "year": 2009,
            "genres": "comedy, drama",
            "votes": 104550,
            "release_date": "2009-09-12",
            "url": "http://www.imdb.com/title/tt1019452/"
        }, {
            "position": 22,
            "const": "tt0365748",
            "created": "Sun Feb 14 01:50:18 2016",
            "modified": "Sun Feb 14 01:50:18 2016",
            "description": "",
            "title": "Shaun of the Dead",
            "type": "Feature Film",
            "directors": "Edgar Wright",
            "user_rating": 10,
            "imdb_rating": 8,
            "runtime": 99,
            "year": 2004,
            "genres": "comedy, horror",
            "votes": 405106,
            "release_date": "2004-03-29",
            "url": "http://www.imdb.com/title/tt0365748/"
        }, {
            "position": 23,
            "const": "tt0432283",
            "created": "Sun Feb 14 01:50:18 2016",
            "modified": "Sun Feb 14 01:50:18 2016",
            "description": "",
            "title": "Fantastic Mr. Fox",
            "type": "Feature Film",
            "directors": "Wes Anderson",
            "user_rating": 10,
            "imdb_rating": 7.8,
            "runtime": 87,
            "year": 2009,
            "genres": "animation, adventure, comedy, crime, family",
            "votes": 143324,
            "release_date": "2009-10-14",
            "url": "http://www.imdb.com/title/tt0432283/"
        }, {
            "position": 24,
            "const": "tt0120601",
            "created": "Sun Feb 14 01:50:18 2016",
            "modified": "Sun Feb 14 01:50:18 2016",
            "description": "",
            "title": "Being John Malkovich",
            "type": "Feature Film",
            "directors": "Spike Jonze",
            "user_rating": 10,
            "imdb_rating": 7.8,
            "runtime": 112,
            "year": 1999,
            "genres": "comedy, drama, fantasy",
            "votes": 258918,
            "release_date": "1999-09-02",
            "url": "http://www.imdb.com/title/tt0120601/"
        }, {
            "position": 25,
            "const": "tt0268126",
            "created": "Sun Feb 14 01:50:18 2016",
            "modified": "Sun Feb 14 01:50:18 2016",
            "description": "",
            "title": "Adaptation.",
            "type": "Feature Film",
            "directors": "Spike Jonze",
            "user_rating": 10,
            "imdb_rating": 7.7,
            "runtime": 114,
            "year": 2002,
            "genres": "comedy, drama",
            "votes": 146046,
            "release_date": "2002-12-06",
            "url": "http://www.imdb.com/title/tt0268126/"
        }, {
            "position": 26,
            "const": "tt1663202",
            "created": "Sun Feb 14 01:50:18 2016",
            "modified": "Sun Feb 14 01:50:18 2016",
            "description": "",
            "title": "The Revenant",
            "type": "Feature Film",
            "directors": "Alejandro G. Iñárritu",
            "user_rating": 9,
            "imdb_rating": 8,
            "runtime": 156,
            "year": 2015,
            "genres": "adventure, drama, thriller, western",
            "votes": 454444,
            "release_date": "2015-12-16",
            "url": "http://www.imdb.com/title/tt1663202/"
        }, {
            "position": 27,
            "const": "tt2401878",
            "created": "Sun Feb 14 01:50:18 2016",
            "modified": "Sun Feb 14 01:50:18 2016",
            "description": "",
            "title": "Anomalisa",
            "type": "Feature Film",
            "directors": "Duke Johnson, Charlie Kaufman",
            "user_rating": 9,
            "imdb_rating": 7.3,
            "runtime": 90,
            "year": 2015,
            "genres": "animation, comedy, drama, romance",
            "votes": 37757,
            "release_date": "2015-09-04",
            "url": "http://www.imdb.com/title/tt2401878/"
        }, {
            "position": 28,
            "const": "tt0118715",
            "created": "Sun Feb 14 01:50:19 2016",
            "modified": "Sun Feb 14 01:50:19 2016",
            "description": "",
            "title": "The Big Lebowski",
            "type": "Feature Film",
            "directors": "Joel Coen",
            "user_rating": 8,
            "imdb_rating": 8.2,
            "runtime": 117,
            "year": 1998,
            "genres": "comedy, crime, mystery",
            "votes": 553594,
            "release_date": "1998-02-15",
            "url": "http://www.imdb.com/title/tt0118715/"
        }, {
            "position": 29,
            "const": "tt0108052",
            "created": "Sun Feb 14 01:50:19 2016",
            "modified": "Sun Feb 14 01:50:19 2016",
            "description": "",
            "title": "Schindler's List",
            "type": "Feature Film",
            "directors": "Steven Spielberg",
            "user_rating": 9,
            "imdb_rating": 8.9,
            "runtime": 195,
            "year": 1993,
            "genres": "biography, drama, history",
            "votes": 890622,
            "release_date": "1993-11-30",
            "url": "http://www.imdb.com/title/tt0108052/"
        }, {
            "position": 30,
            "const": "tt0133093",
            "created": "Sun Feb 14 01:50:19 2016",
            "modified": "Sun Feb 14 01:50:19 2016",
            "description": "",
            "title": "The Matrix",
            "type": "Feature Film",
            "directors": "The Wachowski Brothers, The Wachowski Brothers",
            "user_rating": 9,
            "imdb_rating": 8.7,
            "runtime": 136,
            "year": 1999,
            "genres": "action, sci_fi",
            "votes": 1251724,
            "release_date": "1999-03-24",
            "url": "http://www.imdb.com/title/tt0133093/"
        }, {
            "position": 31,
            "const": "tt0075314",
            "created": "Sun Feb 14 01:50:19 2016",
            "modified": "Sun Feb 14 01:50:19 2016",
            "description": "",
            "title": "Taxi Driver",
            "type": "Feature Film",
            "directors": "Martin Scorsese",
            "user_rating": 9,
            "imdb_rating": 8.3,
            "runtime": 113,
            "year": 1976,
            "genres": "crime, drama",
            "votes": 522982,
            "release_date": "1976-02-07",
            "url": "http://www.imdb.com/title/tt0075314/"
        }, {
            "position": 32,
            "const": "tt0947798",
            "created": "Sun Feb 14 01:50:19 2016",
            "modified": "Sun Feb 14 01:50:19 2016",
            "description": "",
            "title": "Black Swan",
            "type": "Feature Film",
            "directors": "Darren Aronofsky",
            "user_rating": 9,
            "imdb_rating": 8,
            "runtime": 108,
            "year": 2010,
            "genres": "drama, thriller",
            "votes": 563204,
            "release_date": "2010-09-01",
            "url": "http://www.imdb.com/title/tt0947798/"
        }, {
            "position": 33,
            "const": "tt0246578",
            "created": "Sun Feb 14 01:50:19 2016",
            "modified": "Sun Feb 14 01:50:19 2016",
            "description": "",
            "title": "Donnie Darko",
            "type": "Feature Film",
            "directors": "Richard Kelly",
            "user_rating": 10,
            "imdb_rating": 8.1,
            "runtime": 113,
            "year": 2001,
            "genres": "drama, sci_fi, thriller",
            "votes": 596237,
            "release_date": "2001-01-19",
            "url": "http://www.imdb.com/title/tt0246578/"
        }, {
            "position": 34,
            "const": "tt0117951",
            "created": "Sun Feb 14 01:50:19 2016",
            "modified": "Sun Feb 14 01:50:19 2016",
            "description": "",
            "title": "Trainspotting",
            "type": "Feature Film",
            "directors": "Danny Boyle",
            "user_rating": 9,
            "imdb_rating": 8.2,
            "runtime": 94,
            "year": 1996,
            "genres": "drama",
            "votes": 483398,
            "release_date": "1996-02-23",
            "url": "http://www.imdb.com/title/tt0117951/"
        }, {
            "position": 35,
            "const": "tt1748122",
            "created": "Sun Feb 14 01:50:21 2016",
            "modified": "Sun Feb 14 01:50:21 2016",
            "description": "",
            "title": "Moonrise Kingdom",
            "type": "Feature Film",
            "directors": "Wes Anderson",
            "user_rating": 9,
            "imdb_rating": 7.8,
            "runtime": 94,
            "year": 2012,
            "genres": "adventure, comedy, drama, romance",
            "votes": 244464,
            "release_date": "2012-05-16",
            "url": "http://www.imdb.com/title/tt1748122/"
        }, {
            "position": 36,
            "const": "tt0084787",
            "created": "Sun Feb 14 01:50:21 2016",
            "modified": "Sun Feb 14 01:50:21 2016",
            "description": "",
            "title": "The Thing",
            "type": "Feature Film",
            "directors": "John Carpenter",
            "user_rating": 9,
            "imdb_rating": 8.2,
            "runtime": 109,
            "year": 1982,
            "genres": "horror, mystery, sci_fi",
            "votes": 267170,
            "release_date": "1982-06-25",
            "url": "http://www.imdb.com/title/tt0084787/"
        }, {
            "position": 37,
            "const": "tt0120382",
            "created": "Sun Feb 14 01:50:21 2016",
            "modified": "Sun Feb 14 01:50:21 2016",
            "description": "",
            "title": "The Truman Show",
            "type": "Feature Film",
            "directors": "Peter Weir",
            "user_rating": 9,
            "imdb_rating": 8.1,
            "runtime": 103,
            "year": 1998,
            "genres": "comedy, drama, sci_fi",
            "votes": 689281,
            "release_date": "1998-06-01",
            "url": "http://www.imdb.com/title/tt0120382/"
        }, {
            "position": 38,
            "const": "tt0425112",
            "created": "Sun Feb 14 01:50:21 2016",
            "modified": "Sun Feb 14 01:50:21 2016",
            "description": "",
            "title": "Hot Fuzz",
            "type": "Feature Film",
            "directors": "Edgar Wright",
            "user_rating": 9,
            "imdb_rating": 7.9,
            "runtime": 121,
            "year": 2007,
            "genres": "action, comedy, mystery",
            "votes": 360942,
            "release_date": "2007-02-14",
            "url": "http://www.imdb.com/title/tt0425112/"
        }, {
            "position": 39,
            "const": "tt0887883",
            "created": "Sun Feb 14 01:50:21 2016",
            "modified": "Sun Feb 14 01:50:21 2016",
            "description": "",
            "title": "Burn After Reading",
            "type": "Feature Film",
            "directors": "Ethan Coen, Joel Coen",
            "user_rating": 9,
            "imdb_rating": 7,
            "runtime": 96,
            "year": 2008,
            "genres": "comedy, drama",
            "votes": 253318,
            "release_date": "2008-08-27",
            "url": "http://www.imdb.com/title/tt0887883/"
        }, {
            "position": 40,
            "const": "tt1723811",
            "created": "Sun Feb 14 01:50:21 2016",
            "modified": "Sun Feb 14 01:50:21 2016",
            "description": "",
            "title": "Shame",
            "type": "Feature Film",
            "directors": "Steve McQueen",
            "user_rating": 9,
            "imdb_rating": 7.3,
            "runtime": 101,
            "year": 2011,
            "genres": "drama",
            "votes": 149507,
            "release_date": "2011-09-04",
            "url": "http://www.imdb.com/title/tt1723811/"
        }, {
            "position": 41,
            "const": "tt0780536",
            "created": "Sun Feb 14 01:50:21 2016",
            "modified": "Sun Feb 14 01:50:21 2016",
            "description": "",
            "title": "In Bruges",
            "type": "Feature Film",
            "directors": "Martin McDonagh",
            "user_rating": 9,
            "imdb_rating": 8,
            "runtime": 107,
            "year": 2008,
            "genres": "comedy, crime, drama",
            "votes": 314029,
            "release_date": "2008-01-17",
            "url": "http://www.imdb.com/title/tt0780536/"
        }, {
            "position": 42,
            "const": "tt1542344",
            "created": "Sun Feb 14 01:50:21 2016",
            "modified": "Sun Feb 14 01:50:21 2016",
            "description": "",
            "title": "127 Hours",
            "type": "Feature Film",
            "directors": "Danny Boyle",
            "user_rating": 9,
            "imdb_rating": 7.6,
            "runtime": 94,
            "year": 2010,
            "genres": "adventure, biography, drama, thriller",
            "votes": 284459,
            "release_date": "2010-09-04",
            "url": "http://www.imdb.com/title/tt1542344/"
        }, {
            "position": 43,
            "const": "tt1255953",
            "created": "Sun Feb 14 01:50:22 2016",
            "modified": "Sun Feb 14 01:50:22 2016",
            "description": "",
            "title": "Incendies",
            "type": "Feature Film",
            "directors": "Denis Villeneuve",
            "user_rating": 9,
            "imdb_rating": 8.2,
            "runtime": 139,
            "year": 2010,
            "genres": "drama, mystery, war",
            "votes": 85228,
            "release_date": "2010-09-03",
            "url": "http://www.imdb.com/title/tt1255953/"
        }, {
            "position": 44,
            "const": "tt0081398",
            "created": "Sun Feb 14 01:50:22 2016",
            "modified": "Sun Feb 14 01:50:22 2016",
            "description": "",
            "title": "Raging Bull",
            "type": "Feature Film",
            "directors": "Martin Scorsese",
            "user_rating": 9,
            "imdb_rating": 8.3,
            "runtime": 129,
            "year": 1980,
            "genres": "biography, drama, sport",
            "votes": 241238,
            "release_date": "1980-11-13",
            "url": "http://www.imdb.com/title/tt0081398/"
        }, {
            "position": 45,
            "const": "tt0448134",
            "created": "Sun Feb 14 01:50:22 2016",
            "modified": "Sun Feb 14 01:50:22 2016",
            "description": "",
            "title": "Sunshine",
            "type": "Feature Film",
            "directors": "Danny Boyle",
            "user_rating": 9,
            "imdb_rating": 7.3,
            "runtime": 107,
            "year": 2007,
            "genres": "adventure, sci_fi, thriller",
            "votes": 193947,
            "release_date": "2007-03-23",
            "url": "http://www.imdb.com/title/tt0448134/"
        }, {
            "position": 46,
            "const": "tt1191111",
            "created": "Sun Feb 14 01:50:22 2016",
            "modified": "Sun Feb 14 01:50:22 2016",
            "description": "",
            "title": "Enter the Void",
            "type": "Feature Film",
            "directors": "Gaspar Noé",
            "user_rating": 9,
            "imdb_rating": 7.3,
            "runtime": 161,
            "year": 2009,
            "genres": "drama, fantasy",
            "votes": 47441,
            "release_date": "2009-05-22",
            "url": "http://www.imdb.com/title/tt1191111/"
        }, {
            "position": 47,
            "const": "tt0092991",
            "created": "Sun Feb 14 01:50:22 2016",
            "modified": "Sun Feb 14 01:50:22 2016",
            "description": "",
            "title": "Evil Dead II",
            "type": "Feature Film",
            "directors": "Sam Raimi",
            "user_rating": 9,
            "imdb_rating": 7.8,
            "runtime": 84,
            "year": 1987,
            "genres": "comedy, fantasy, horror, thriller",
            "votes": 117146,
            "release_date": "1987-03-13",
            "url": "http://www.imdb.com/title/tt0092991/"
        }, {
            "position": 48,
            "const": "tt0986233",
            "created": "Sun Feb 14 01:50:22 2016",
            "modified": "Sun Feb 14 01:50:22 2016",
            "description": "",
            "title": "Hunger",
            "type": "Feature Film",
            "directors": "Steve McQueen",
            "user_rating": 9,
            "imdb_rating": 7.6,
            "runtime": 96,
            "year": 2008,
            "genres": "biography, drama",
            "votes": 52381,
            "release_date": "2008-05-15",
            "url": "http://www.imdb.com/title/tt0986233/"
        }, {
            "position": 49,
            "const": "tt2334896",
            "created": "Sun Feb 14 01:50:22 2016",
            "modified": "Sun Feb 14 01:50:22 2016",
            "description": "",
            "title": "The Dirties",
            "type": "Feature Film",
            "directors": "Matt Johnson",
            "user_rating": 7,
            "imdb_rating": 6.8,
            "runtime": 83,
            "year": 2013,
            "genres": "crime, drama, thriller",
            "votes": 4198,
            "release_date": "2013-01",
            "url": "http://www.imdb.com/title/tt2334896/"
        }, {
            "position": 50,
            "const": "tt1038988",
            "created": "Sun Feb 14 01:50:22 2016",
            "modified": "Sun Feb 14 01:50:22 2016",
            "description": "",
            "title": "[Rec]",
            "type": "Feature Film",
            "directors": "Jaume Balagueró, Paco Plaza",
            "user_rating": 8,
            "imdb_rating": 7.5,
            "runtime": 78,
            "year": 2007,
            "genres": "horror",
            "votes": 134695,
            "release_date": "2007-08-29",
            "url": "http://www.imdb.com/title/tt1038988/"
        }, {
            "position": 51,
            "const": "tt3397884",
            "created": "Sun Feb 14 01:50:22 2016",
            "modified": "Sun Feb 14 01:50:22 2016",
            "description": "",
            "title": "Sicario",
            "type": "Feature Film",
            "directors": "Denis Villeneuve",
            "user_rating": 8,
            "imdb_rating": 7.6,
            "runtime": 121,
            "year": 2015,
            "genres": "action, crime, drama, mystery, thriller",
            "votes": 219607,
            "release_date": "2015-05-19",
            "url": "http://www.imdb.com/title/tt3397884/"
        }, {
            "position": 52,
            "const": "tt2080374",
            "created": "Sun Feb 14 01:50:22 2016",
            "modified": "Sun Feb 14 01:50:22 2016",
            "description": "",
            "title": "Steve Jobs",
            "type": "Feature Film",
            "directors": "Danny Boyle",
            "user_rating": 7,
            "imdb_rating": 7.2,
            "runtime": 122,
            "year": 2015,
            "genres": "biography, drama",
            "votes": 105149,
            "release_date": "2015-09-05",
            "url": "http://www.imdb.com/title/tt2080374/"
        }, {
            "position": 53,
            "const": "tt3464902",
            "created": "Sun Feb 14 01:50:23 2016",
            "modified": "Sun Feb 14 01:50:23 2016",
            "description": "",
            "title": "The Lobster",
            "type": "Feature Film",
            "directors": "Yorgos Lanthimos",
            "user_rating": 8,
            "imdb_rating": 7.1,
            "runtime": 119,
            "year": 2015,
            "genres": "comedy, drama, romance, sci_fi",
            "votes": 95433,
            "release_date": "2015-05-15",
            "url": "http://www.imdb.com/title/tt3464902/"
        }, {
            "position": 54,
            "const": "tt0407887",
            "created": "Sun Feb 14 01:50:23 2016",
            "modified": "Sun Feb 14 01:50:23 2016",
            "description": "",
            "title": "The Departed",
            "type": "Feature Film",
            "directors": "Martin Scorsese",
            "user_rating": 8,
            "imdb_rating": 8.5,
            "runtime": 151,
            "year": 2006,
            "genres": "crime, drama, thriller",
            "votes": 899021,
            "release_date": "2006-09-26",
            "url": "http://www.imdb.com/title/tt0407887/"
        }, {
            "position": 55,
            "const": "tt0109830",
            "created": "Sun Feb 14 01:50:23 2016",
            "modified": "Sun Feb 14 01:50:23 2016",
            "description": "",
            "title": "Forrest Gump",
            "type": "Feature Film",
            "directors": "Robert Zemeckis",
            "user_rating": 8,
            "imdb_rating": 8.8,
            "runtime": 142,
            "year": 1994,
            "genres": "comedy, drama",
            "votes": 1293666,
            "release_date": "1994-06-23",
            "url": "http://www.imdb.com/title/tt0109830/"
        }, {
            "position": 56,
            "const": "tt2101441",
            "created": "Sun Feb 14 01:50:23 2016",
            "modified": "Sun Feb 14 01:50:23 2016",
            "description": "",
            "title": "Spring Breakers",
            "type": "Feature Film",
            "directors": "Harmony Korine",
            "user_rating": 8,
            "imdb_rating": 5.3,
            "runtime": 94,
            "year": 2012,
            "genres": "crime, drama",
            "votes": 111196,
            "release_date": "2012-09-05",
            "url": "http://www.imdb.com/title/tt2101441/"
        }, {
            "position": 57,
            "const": "tt0102926",
            "created": "Sun Feb 14 01:50:23 2016",
            "modified": "Sun Feb 14 01:50:23 2016",
            "description": "",
            "title": "The Silence of the Lambs",
            "type": "Feature Film",
            "directors": "Jonathan Demme",
            "user_rating": 8,
            "imdb_rating": 8.6,
            "runtime": 118,
            "year": 1991,
            "genres": "crime, drama, thriller",
            "votes": 916352,
            "release_date": "1991-01-30",
            "url": "http://www.imdb.com/title/tt0102926/"
        }, {
            "position": 58,
            "const": "tt0446029",
            "created": "Sun Feb 14 01:50:23 2016",
            "modified": "Sun Feb 14 01:50:23 2016",
            "description": "",
            "title": "Scott Pilgrim vs. the World",
            "type": "Feature Film",
            "directors": "Edgar Wright",
            "user_rating": 8,
            "imdb_rating": 7.5,
            "runtime": 112,
            "year": 2010,
            "genres": "action, comedy, fantasy, romance",
            "votes": 281105,
            "release_date": "2010-07-27",
            "url": "http://www.imdb.com/title/tt0446029/"
        }, {
            "position": 59,
            "const": "tt2024544",
            "created": "Sun Feb 14 01:50:23 2016",
            "modified": "Sun Feb 14 01:50:23 2016",
            "description": "",
            "title": "12 Years a Slave",
            "type": "Feature Film",
            "directors": "Steve McQueen",
            "user_rating": 8,
            "imdb_rating": 8.1,
            "runtime": 134,
            "year": 2013,
            "genres": "biography, drama, history",
            "votes": 457795,
            "release_date": "2013-08-30",
            "url": "http://www.imdb.com/title/tt2024544/"
        }, {
            "position": 60,
            "const": "tt0114369",
            "created": "Sun Feb 14 01:50:23 2016",
            "modified": "Sun Feb 14 01:50:23 2016",
            "description": "",
            "title": "Se7en",
            "type": "Feature Film",
            "directors": "David Fincher",
            "user_rating": 8,
            "imdb_rating": 8.6,
            "runtime": 127,
            "year": 1995,
            "genres": "crime, drama, mystery, thriller",
            "votes": 1055670,
            "release_date": "1995-09-15",
            "url": "http://www.imdb.com/title/tt0114369/"
        }, {
            "position": 61,
            "const": "tt0208092",
            "created": "Sun Feb 14 01:50:23 2016",
            "modified": "Sun Feb 14 01:50:23 2016",
            "description": "",
            "title": "Snatch",
            "type": "Feature Film",
            "directors": "Guy Ritchie",
            "user_rating": 8,
            "imdb_rating": 8.3,
            "runtime": 104,
            "year": 2000,
            "genres": "comedy, crime",
            "votes": 616325,
            "release_date": "2000-08-23",
            "url": "http://www.imdb.com/title/tt0208092/"
        }, {
            "position": 62,
            "const": "tt0758758",
            "created": "Sun Feb 14 01:50:23 2016",
            "modified": "Sun Feb 14 01:50:23 2016",
            "description": "",
            "title": "Into the Wild",
            "type": "Feature Film",
            "directors": "Sean Penn",
            "user_rating": 8,
            "imdb_rating": 8.2,
            "runtime": 148,
            "year": 2007,
            "genres": "adventure, biography, drama",
            "votes": 439974,
            "release_date": "2007-09-01",
            "url": "http://www.imdb.com/title/tt0758758/"
        }, {
            "position": 63,
            "const": "tt1172570",
            "created": "Sun Feb 14 01:50:24 2016",
            "modified": "Sun Feb 14 01:50:24 2016",
            "description": "",
            "title": "Bronson",
            "type": "Feature Film",
            "directors": "Nicolas Winding Refn",
            "user_rating": 8,
            "imdb_rating": 7.1,
            "runtime": 92,
            "year": 2008,
            "genres": "action, biography, crime, drama",
            "votes": 88720,
            "release_date": "2008-10",
            "url": "http://www.imdb.com/title/tt1172570/"
        }, {
            "position": 64,
            "const": "tt0083866",
            "created": "Sun Feb 14 01:50:24 2016",
            "modified": "Sun Feb 14 01:50:24 2016",
            "description": "",
            "title": "E.T. the Extra-Terrestrial",
            "type": "Feature Film",
            "directors": "Steven Spielberg",
            "user_rating": 8,
            "imdb_rating": 7.9,
            "runtime": 115,
            "year": 1982,
            "genres": "family, sci_fi",
            "votes": 289191,
            "release_date": "1982-05-26",
            "url": "http://www.imdb.com/title/tt0083866/"
        }, {
            "position": 65,
            "const": "tt0056592",
            "created": "Sun Feb 14 01:50:24 2016",
            "modified": "Sun Feb 14 01:50:24 2016",
            "description": "",
            "title": "To Kill a Mockingbird",
            "type": "Feature Film",
            "directors": "Robert Mulligan",
            "user_rating": 8,
            "imdb_rating": 8.3,
            "runtime": 129,
            "year": 1962,
            "genres": "crime, drama",
            "votes": 221637,
            "release_date": "1962-12-25",
            "url": "http://www.imdb.com/title/tt0056592/"
        }, {
            "position": 66,
            "const": "tt1504320",
            "created": "Sun Feb 14 01:50:24 2016",
            "modified": "Sun Feb 14 01:50:24 2016",
            "description": "",
            "title": "The King's Speech",
            "type": "Feature Film",
            "directors": "Tom Hooper",
            "user_rating": 8,
            "imdb_rating": 8,
            "runtime": 118,
            "year": 2010,
            "genres": "biography, drama",
            "votes": 517474,
            "release_date": "2010-09-06",
            "url": "http://www.imdb.com/title/tt1504320/"
        }, {
            "position": 67,
            "const": "tt0382932",
            "created": "Sun Feb 14 01:50:24 2016",
            "modified": "Sun Feb 14 01:50:24 2016",
            "description": "",
            "title": "Ratatouille",
            "type": "Feature Film",
            "directors": "Brad Bird, Jan Pinkava",
            "user_rating": 8,
            "imdb_rating": 8,
            "runtime": 111,
            "year": 2007,
            "genres": "animation, comedy, family, fantasy",
            "votes": 486217,
            "release_date": "2007-06-22",
            "url": "http://www.imdb.com/title/tt0382932/"
        }, {
            "position": 68,
            "const": "tt0347149",
            "created": "Sun Feb 14 01:50:24 2016",
            "modified": "Sun Feb 14 01:50:24 2016",
            "description": "",
            "title": "Howl's Moving Castle",
            "type": "Feature Film",
            "directors": "Hayao Miyazaki",
            "user_rating": 8,
            "imdb_rating": 8.2,
            "runtime": 119,
            "year": 2004,
            "genres": "animation, adventure, family, fantasy",
            "votes": 222285,
            "release_date": "2004-09-05",
            "url": "http://www.imdb.com/title/tt0347149/"
        }, {
            "position": 69,
            "const": "tt0096256",
            "created": "Sun Feb 14 01:50:24 2016",
            "modified": "Sun Feb 14 01:50:24 2016",
            "description": "",
            "title": "They Live",
            "type": "Feature Film",
            "directors": "John Carpenter",
            "user_rating": 8,
            "imdb_rating": 7.3,
            "runtime": 93,
            "year": 1988,
            "genres": "action, horror, sci_fi, thriller",
            "votes": 76457,
            "release_date": "1988-11-04",
            "url": "http://www.imdb.com/title/tt0096256/"
        }, {
            "position": 70,
            "const": "tt0083907",
            "created": "Sun Feb 14 01:50:24 2016",
            "modified": "Sun Feb 14 01:50:24 2016",
            "description": "",
            "title": "The Evil Dead",
            "type": "Feature Film",
            "directors": "Sam Raimi",
            "user_rating": 8,
            "imdb_rating": 7.6,
            "runtime": 85,
            "year": 1981,
            "genres": "horror, thriller",
            "votes": 145958,
            "release_date": "1981-10-15",
            "url": "http://www.imdb.com/title/tt0083907/"
        }, {
            "position": 71,
            "const": "tt0096283",
            "created": "Sun Feb 14 01:50:24 2016",
            "modified": "Sun Feb 14 01:50:24 2016",
            "description": "",
            "title": "My Neighbor Totoro",
            "type": "Feature Film",
            "directors": "Hayao Miyazaki",
            "user_rating": 8,
            "imdb_rating": 8.2,
            "runtime": 86,
            "year": 1988,
            "genres": "animation, family, fantasy",
            "votes": 180075,
            "release_date": "1988-04-16",
            "url": "http://www.imdb.com/title/tt0096283/"
        }, {
            "position": 72,
            "const": "tt0128445",
            "created": "Sun Feb 14 01:50:24 2016",
            "modified": "Sun Feb 14 01:50:24 2016",
            "description": "",
            "title": "Rushmore",
            "type": "Feature Film",
            "directors": "Wes Anderson",
            "user_rating": 8,
            "imdb_rating": 7.7,
            "runtime": 93,
            "year": 1998,
            "genres": "comedy, drama",
            "votes": 137589,
            "release_date": "1998-09-17",
            "url": "http://www.imdb.com/title/tt0128445/"
        }, {
            "position": 73,
            "const": "tt0266308",
            "created": "Sun Feb 14 01:50:24 2016",
            "modified": "Sun Feb 14 01:50:24 2016",
            "description": "",
            "title": "Battle Royale",
            "type": "Feature Film",
            "directors": "Kinji Fukasaku",
            "user_rating": 8,
            "imdb_rating": 7.7,
            "runtime": 114,
            "year": 2000,
            "genres": "adventure, drama, sci_fi, thriller",
            "votes": 141469,
            "release_date": "2000-10",
            "url": "http://www.imdb.com/title/tt0266308/"
        }, {
            "position": 74,
            "const": "tt0085334",
            "created": "Sun Feb 14 01:50:25 2016",
            "modified": "Sun Feb 14 01:50:25 2016",
            "description": "",
            "title": "A Christmas Story",
            "type": "Feature Film",
            "directors": "Bob Clark",
            "user_rating": 7,
            "imdb_rating": 8,
            "runtime": 94,
            "year": 1983,
            "genres": "comedy, family",
            "votes": 106345,
            "release_date": "1983-11-18",
            "url": "http://www.imdb.com/title/tt0085334/"
        }, {
            "position": 75,
            "const": "tt0470752",
            "created": "Sun Feb 14 01:50:25 2016",
            "modified": "Sun Feb 14 01:50:25 2016",
            "description": "",
            "title": "Ex Machina",
            "type": "Feature Film",
            "directors": "Alex Garland",
            "user_rating": 7,
            "imdb_rating": 7.7,
            "runtime": 108,
            "year": 2015,
            "genres": "drama, mystery, sci_fi, thriller",
            "votes": 310771,
            "release_date": "2015-01-21",
            "url": "http://www.imdb.com/title/tt0470752/"
        }, {
            "position": 76,
            "const": "tt1365050",
            "created": "Sun Feb 14 01:50:25 2016",
            "modified": "Sun Feb 14 01:50:25 2016",
            "description": "",
            "title": "Beasts of No Nation",
            "type": "Feature Film",
            "directors": "Cary Joji Fukunaga",
            "user_rating": 7,
            "imdb_rating": 7.8,
            "runtime": 137,
            "year": 2015,
            "genres": "drama, war",
            "votes": 45665,
            "release_date": "2015-09-03",
            "url": "http://www.imdb.com/title/tt1365050/"
        }, {
            "position": 77,
            "const": "tt1853728",
            "created": "Sun Feb 14 01:50:25 2016",
            "modified": "Sun Feb 14 01:50:25 2016",
            "description": "",
            "title": "Django Unchained",
            "type": "Feature Film",
            "directors": "Quentin Tarantino",
            "user_rating": 7,
            "imdb_rating": 8.4,
            "runtime": 165,
            "year": 2012,
            "genres": "drama, western",
            "votes": 988681,
            "release_date": "2012-12-11",
            "url": "http://www.imdb.com/title/tt1853728/"
        }, {
            "position": 78,
            "const": "tt3544082",
            "created": "Sun Feb 14 01:50:25 2016",
            "modified": "Sun Feb 14 01:50:25 2016",
            "description": "",
            "title": "45 Years",
            "type": "Feature Film",
            "directors": "Andrew Haigh",
            "user_rating": 7,
            "imdb_rating": 7.1,
            "runtime": 91,
            "year": 2015,
            "genres": "drama, romance",
            "votes": 20618,
            "release_date": "2015-02-06",
            "url": "http://www.imdb.com/title/tt3544082/"
        }, {
            "position": 79,
            "const": "tt0093779",
            "created": "Sun Feb 14 01:50:25 2016",
            "modified": "Sun Feb 14 01:50:25 2016",
            "description": "",
            "title": "The Princess Bride",
            "type": "Feature Film",
            "directors": "Rob Reiner",
            "user_rating": 7,
            "imdb_rating": 8.1,
            "runtime": 98,
            "year": 1987,
            "genres": "adventure, family, fantasy, romance",
            "votes": 301822,
            "release_date": "1987-09-18",
            "url": "http://www.imdb.com/title/tt0093779/"
        }, {
            "position": 80,
            "const": "tt0110413",
            "created": "Sun Feb 14 01:50:25 2016",
            "modified": "Sun Feb 14 01:50:25 2016",
            "description": "",
            "title": "Léon: The Professional",
            "type": "Feature Film",
            "directors": "Luc Besson",
            "user_rating": 8,
            "imdb_rating": 8.6,
            "runtime": 110,
            "year": 1994,
            "genres": "crime, drama, thriller",
            "votes": 748335,
            "release_date": "1994-09-14",
            "url": "http://www.imdb.com/title/tt0110413/"
        }, {
            "position": 81,
            "const": "tt1568346",
            "created": "Sun Feb 14 01:50:25 2016",
            "modified": "Sun Feb 14 01:50:25 2016",
            "description": "",
            "title": "The Girl with the Dragon Tattoo",
            "type": "Feature Film",
            "directors": "David Fincher",
            "user_rating": 7,
            "imdb_rating": 7.8,
            "runtime": 158,
            "year": 2011,
            "genres": "crime, drama, mystery, thriller",
            "votes": 337787,
            "release_date": "2011-12-12",
            "url": "http://www.imdb.com/title/tt1568346/"
        }, {
            "position": 82,
            "const": "tt3416742",
            "created": "Sun Feb 14 01:50:25 2016",
            "modified": "Sun Feb 14 01:50:25 2016",
            "description": "",
            "title": "What We Do in the Shadows",
            "type": "Feature Film",
            "directors": "Jemaine Clement, Taika Waititi",
            "user_rating": 7,
            "imdb_rating": 7.6,
            "runtime": 86,
            "year": 2014,
            "genres": "comedy, fantasy, horror",
            "votes": 74966,
            "release_date": "2014-01-19",
            "url": "http://www.imdb.com/title/tt3416742/"
        }, {
            "position": 83,
            "const": "tt0107290",
            "created": "Sun Feb 14 01:50:25 2016",
            "modified": "Sun Feb 14 01:50:25 2016",
            "description": "",
            "title": "Jurassic Park",
            "type": "Feature Film",
            "directors": "Steven Spielberg",
            "user_rating": 7,
            "imdb_rating": 8.1,
            "runtime": 127,
            "year": 1993,
            "genres": "adventure, sci_fi, thriller",
            "votes": 633939,
            "release_date": "1993-06-09",
            "url": "http://www.imdb.com/title/tt0107290/"
        }, {
            "position": 84,
            "const": "tt0317248",
            "created": "Sun Feb 14 01:50:25 2016",
            "modified": "Sun Feb 14 01:50:25 2016",
            "description": "",
            "title": "City of God",
            "type": "Feature Film",
            "directors": "Fernando Meirelles, Kátia Lund",
            "user_rating": 7,
            "imdb_rating": 8.7,
            "runtime": 130,
            "year": 2002,
            "genres": "crime, drama",
            "votes": 547254,
            "release_date": "2002-05-18",
            "url": "http://www.imdb.com/title/tt0317248/"
        }, {
            "position": 85,
            "const": "tt0086250",
            "created": "Sun Feb 14 01:50:26 2016",
            "modified": "Sun Feb 14 01:50:26 2016",
            "description": "",
            "title": "Scarface",
            "type": "Feature Film",
            "directors": "Brian De Palma",
            "user_rating": 7,
            "imdb_rating": 8.3,
            "runtime": 170,
            "year": 1983,
            "genres": "crime, drama",
            "votes": 552644,
            "release_date": "1983-12-01",
            "url": "http://www.imdb.com/title/tt0086250/"
        }, {
            "position": 86,
            "const": "tt0088847",
            "created": "Sun Feb 14 01:50:26 2016",
            "modified": "Sun Feb 14 01:50:26 2016",
            "description": "",
            "title": "The Breakfast Club",
            "type": "Feature Film",
            "directors": "John Hughes",
            "user_rating": 7,
            "imdb_rating": 7.9,
            "runtime": 97,
            "year": 1985,
            "genres": "comedy, drama",
            "votes": 264633,
            "release_date": "1985-02-07",
            "url": "http://www.imdb.com/title/tt0088847/"
        }, {
            "position": 87,
            "const": "tt0054215",
            "created": "Sun Feb 14 01:50:26 2016",
            "modified": "Sun Feb 14 01:50:26 2016",
            "description": "",
            "title": "Psycho",
            "type": "Feature Film",
            "directors": "Alfred Hitchcock",
            "user_rating": 7,
            "imdb_rating": 8.5,
            "runtime": 109,
            "year": 1960,
            "genres": "horror, mystery, thriller",
            "votes": 435596,
            "release_date": "1960-06-16",
            "url": "http://www.imdb.com/title/tt0054215/"
        }, {
            "position": 88,
            "const": "tt2294449",
            "created": "Sun Feb 14 01:50:26 2016",
            "modified": "Sun Feb 14 01:50:26 2016",
            "description": "",
            "title": "22 Jump Street",
            "type": "Feature Film",
            "directors": "Phil Lord, Christopher Miller",
            "user_rating": 7,
            "imdb_rating": 7.1,
            "runtime": 112,
            "year": 2014,
            "genres": "action, comedy, crime",
            "votes": 267442,
            "release_date": "2014-06-04",
            "url": "http://www.imdb.com/title/tt2294449/"
        }, {
            "position": 89,
            "const": "tt0091042",
            "created": "Sun Feb 14 01:50:26 2016",
            "modified": "Sun Feb 14 01:50:26 2016",
            "description": "",
            "title": "Ferris Bueller's Day Off",
            "type": "Feature Film",
            "directors": "John Hughes",
            "user_rating": 7,
            "imdb_rating": 7.8,
            "runtime": 103,
            "year": 1986,
            "genres": "comedy",
            "votes": 250031,
            "release_date": "1986-06-11",
            "url": "http://www.imdb.com/title/tt0091042/"
        }, {
            "position": 90,
            "const": "tt0088247",
            "created": "Sun Feb 14 01:50:26 2016",
            "modified": "Sun Feb 14 01:50:26 2016",
            "description": "",
            "title": "The Terminator",
            "type": "Feature Film",
            "directors": "James Cameron",
            "user_rating": 7,
            "imdb_rating": 8,
            "runtime": 107,
            "year": 1984,
            "genres": "action, sci_fi",
            "votes": 616730,
            "release_date": "1984-10-26",
            "url": "http://www.imdb.com/title/tt0088247/"
        }, {
            "position": 91,
            "const": "tt0887912",
            "created": "Sun Feb 14 01:50:26 2016",
            "modified": "Sun Feb 14 01:50:26 2016",
            "description": "",
            "title": "The Hurt Locker",
            "type": "Feature Film",
            "directors": "Kathryn Bigelow",
            "user_rating": 7,
            "imdb_rating": 7.6,
            "runtime": 131,
            "year": 2008,
            "genres": "drama, history, thriller, war",
            "votes": 339668,
            "release_date": "2008-09-04",
            "url": "http://www.imdb.com/title/tt0887912/"
        }, {
            "position": 92,
            "const": "tt1441395",
            "created": "Sun Feb 14 01:50:26 2016",
            "modified": "Sun Feb 14 01:50:26 2016",
            "description": "",
            "title": "Under the Skin",
            "type": "Feature Film",
            "directors": "Jonathan Glazer",
            "user_rating": 7,
            "imdb_rating": 6.3,
            "runtime": 108,
            "year": 2013,
            "genres": "drama, horror, sci_fi, thriller",
            "votes": 89284,
            "release_date": "2013-08-29",
            "url": "http://www.imdb.com/title/tt1441395/"
        }, {
            "position": 93,
            "const": "tt0034583",
            "created": "Sun Feb 14 01:50:26 2016",
            "modified": "Sun Feb 14 01:50:26 2016",
            "description": "",
            "title": "Casablanca",
            "type": "Feature Film",
            "directors": "Michael Curtiz",
            "user_rating": 7,
            "imdb_rating": 8.6,
            "runtime": 102,
            "year": 1942,
            "genres": "drama, romance, war",
            "votes": 397514,
            "release_date": "1942-11-26",
            "url": "http://www.imdb.com/title/tt0034583/"
        }, {
            "position": 94,
            "const": "tt1706593",
            "created": "Sun Feb 14 01:50:26 2016",
            "modified": "Sun Feb 14 01:50:26 2016",
            "description": "",
            "title": "Chronicle",
            "type": "Feature Film",
            "directors": "Josh Trank",
            "user_rating": 7,
            "imdb_rating": 7.1,
            "runtime": 84,
            "year": 2012,
            "genres": "sci_fi, thriller",
            "votes": 208052,
            "release_date": "2012-01-28",
            "url": "http://www.imdb.com/title/tt1706593/"
        }, {
            "position": 95,
            "const": "tt0454876",
            "created": "Sun Feb 14 01:50:26 2016",
            "modified": "Sun Feb 14 01:50:26 2016",
            "description": "",
            "title": "Life of Pi",
            "type": "Feature Film",
            "directors": "Ang Lee",
            "user_rating": 7,
            "imdb_rating": 8,
            "runtime": 127,
            "year": 2012,
            "genres": "adventure, drama, fantasy",
            "votes": 452891,
            "release_date": "2012-09-28",
            "url": "http://www.imdb.com/title/tt0454876/"
        }, {
            "position": 96,
            "const": "tt0245429",
            "created": "Sun Feb 14 01:52:46 2016",
            "modified": "Sun Feb 14 01:52:46 2016",
            "description": "",
            "title": "Spirited Away",
            "type": "Feature Film",
            "directors": "Hayao Miyazaki",
            "user_rating": 9,
            "imdb_rating": 8.6,
            "runtime": 125,
            "year": 2001,
            "genres": "animation, adventure, family, fantasy, mystery",
            "votes": 434811,
            "release_date": "2001-07-20",
            "url": "http://www.imdb.com/title/tt0245429/"
        }, {
            "position": 97,
            "const": "tt0167404",
            "created": "Sun Feb 14 01:52:53 2016",
            "modified": "Sun Feb 14 01:52:53 2016",
            "description": "",
            "title": "The Sixth Sense",
            "type": "Feature Film",
            "directors": "M. Night Shyamalan",
            "user_rating": 8,
            "imdb_rating": 8.1,
            "runtime": 107,
            "year": 1999,
            "genres": "drama, mystery, thriller",
            "votes": 722234,
            "release_date": "1999-08-02",
            "url": "http://www.imdb.com/title/tt0167404/"
        }, {
            "position": 98,
            "const": "tt2316411",
            "created": "Sun Feb 14 01:53:02 2016",
            "modified": "Sun Feb 14 01:53:02 2016",
            "description": "",
            "title": "Enemy",
            "type": "Feature Film",
            "directors": "Denis Villeneuve",
            "user_rating": 8,
            "imdb_rating": 6.9,
            "runtime": 91,
            "year": 2013,
            "genres": "mystery, thriller",
            "votes": 101344,
            "release_date": "2013-09-08",
            "url": "http://www.imdb.com/title/tt2316411/"
        }, {
            "position": 99,
            "const": "tt0434409",
            "created": "Sun Feb 14 01:53:10 2016",
            "modified": "Sun Feb 14 01:53:10 2016",
            "description": "",
            "title": "V for Vendetta",
            "type": "Feature Film",
            "directors": "James McTeigue",
            "user_rating": 7,
            "imdb_rating": 8.2,
            "runtime": 132,
            "year": 2005,
            "genres": "action, drama, thriller",
            "votes": 815346,
            "release_date": "2005-12-11",
            "url": "http://www.imdb.com/title/tt0434409/"
        }, {
            "position": 100,
            "const": "tt0038650",
            "created": "Sun Feb 14 01:55:46 2016",
            "modified": "Sun Feb 14 01:55:46 2016",
            "description": "",
            "title": "It's a Wonderful Life",
            "type": "Feature Film",
            "directors": "Frank Capra",
            "user_rating": 7,
            "imdb_rating": 8.6,
            "runtime": 130,
            "year": 1946,
            "genres": "drama, family, fantasy",
            "votes": 284005,
            "release_date": "1946-12-21",
            "url": "http://www.imdb.com/title/tt0038650/"
        }, {
            "position": 101,
            "const": "tt0067992",
            "created": "Sun Feb 14 01:55:46 2016",
            "modified": "Sun Feb 14 01:55:46 2016",
            "description": "",
            "title": "Willy Wonka & the Chocolate Factory",
            "type": "Feature Film",
            "directors": "Mel Stuart",
            "user_rating": 7,
            "imdb_rating": 7.8,
            "runtime": 100,
            "year": 1971,
            "genres": "family, fantasy, musical",
            "votes": 133923,
            "release_date": "1971-06-30",
            "url": "http://www.imdb.com/title/tt0067992/"
        }, {
            "position": 102,
            "const": "tt0316654",
            "created": "Sun Feb 14 01:55:46 2016",
            "modified": "Sun Feb 14 01:55:46 2016",
            "description": "",
            "title": "Spider-Man 2",
            "type": "Feature Film",
            "directors": "Sam Raimi",
            "user_rating": 7,
            "imdb_rating": 7.3,
            "runtime": 127,
            "year": 2004,
            "genres": "action, adventure, fantasy",
            "votes": 422334,
            "release_date": "2004-06-25",
            "url": "http://www.imdb.com/title/tt0316654/"
        }, {
            "position": 103,
            "const": "tt0369339",
            "created": "Sun Feb 14 01:55:46 2016",
            "modified": "Sun Feb 14 01:55:46 2016",
            "description": "",
            "title": "Collateral",
            "type": "Feature Film",
            "directors": "Michael Mann",
            "user_rating": 7,
            "imdb_rating": 7.6,
            "runtime": 120,
            "year": 2004,
            "genres": "crime, drama, thriller",
            "votes": 299170,
            "release_date": "2004-08-02",
            "url": "http://www.imdb.com/title/tt0369339/"
        }, {
            "position": 104,
            "const": "tt3278330",
            "created": "Sun Feb 14 01:55:46 2016",
            "modified": "Sun Feb 14 01:55:46 2016",
            "description": "",
            "title": "Tale of Tales",
            "type": "Feature Film",
            "directors": "Matteo Garrone",
            "user_rating": 7,
            "imdb_rating": 6.4,
            "runtime": 133,
            "year": 2015,
            "genres": "drama, fantasy",
            "votes": 14938,
            "release_date": "2015-05-14",
            "url": "http://www.imdb.com/title/tt3278330/"
        }, {
            "position": 105,
            "const": "tt0275847",
            "created": "Sun Feb 14 01:55:47 2016",
            "modified": "Sun Feb 14 01:55:47 2016",
            "description": "",
            "title": "Lilo & Stitch",
            "type": "Feature Film",
            "directors": "Dean DeBlois, Chris Sanders",
            "user_rating": 7,
            "imdb_rating": 7.2,
            "runtime": 85,
            "year": 2002,
            "genres": "animation, adventure, comedy, drama, family, fantasy, sci_fi",
            "votes": 121109,
            "release_date": "2002-06-16",
            "url": "http://www.imdb.com/title/tt0275847/"
        }, {
            "position": 106,
            "const": "tt2965466",
            "created": "Sun Feb 14 01:55:47 2016",
            "modified": "Sun Feb 14 01:55:47 2016",
            "description": "",
            "title": "Last Shift",
            "type": "Feature Film",
            "directors": "Anthony DiBlasi",
            "user_rating": 7,
            "imdb_rating": 5.7,
            "runtime": 90,
            "year": 2014,
            "genres": "horror, mystery, thriller",
            "votes": 9844,
            "release_date": "2014-10-25",
            "url": "http://www.imdb.com/title/tt2965466/"
        }, {
            "position": 107,
            "const": "tt0393109",
            "created": "Sun Feb 14 01:55:47 2016",
            "modified": "Sun Feb 14 01:55:47 2016",
            "description": "",
            "title": "Brick",
            "type": "Feature Film",
            "directors": "Rian Johnson",
            "user_rating": 7,
            "imdb_rating": 7.4,
            "runtime": 110,
            "year": 2005,
            "genres": "action, crime, drama, mystery, thriller",
            "votes": 86313,
            "release_date": "2005-01",
            "url": "http://www.imdb.com/title/tt0393109/"
        }, {
            "position": 108,
            "const": "tt0366548",
            "created": "Sun Feb 14 01:55:47 2016",
            "modified": "Sun Feb 14 01:55:47 2016",
            "description": "",
            "title": "Happy Feet",
            "type": "Feature Film",
            "directors": "George Miller, Warren Coleman",
            "user_rating": 7,
            "imdb_rating": 6.5,
            "runtime": 108,
            "year": 2006,
            "genres": "animation, comedy, family, music, romance",
            "votes": 135852,
            "release_date": "2006-11-16",
            "url": "http://www.imdb.com/title/tt0366548/"
        }, {
            "position": 109,
            "const": "tt0074958",
            "created": "Sun Feb 14 01:55:47 2016",
            "modified": "Sun Feb 14 01:55:47 2016",
            "description": "",
            "title": "Network",
            "type": "Feature Film",
            "directors": "Sidney Lumet",
            "user_rating": 7,
            "imdb_rating": 8.1,
            "runtime": 121,
            "year": 1976,
            "genres": "drama",
            "votes": 106776,
            "release_date": "1976-11-14",
            "url": "http://www.imdb.com/title/tt0074958/"
        }, {
            "position": 110,
            "const": "tt0138704",
            "created": "Sun Feb 14 01:55:47 2016",
            "modified": "Sun Feb 14 01:55:47 2016",
            "description": "",
            "title": "Pi",
            "type": "Feature Film",
            "directors": "Darren Aronofsky",
            "user_rating": 7,
            "imdb_rating": 7.5,
            "runtime": 84,
            "year": 1998,
            "genres": "drama, horror, mystery, sci_fi, thriller",
            "votes": 144856,
            "release_date": "1998-01",
            "url": "http://www.imdb.com/title/tt0138704/"
        }, {
            "position": 111,
            "const": "tt0413300",
            "created": "Sun Feb 14 01:55:51 2016",
            "modified": "Sun Feb 14 01:55:51 2016",
            "description": "",
            "title": "Spider-Man 3",
            "type": "Feature Film",
            "directors": "Sam Raimi",
            "user_rating": 6,
            "imdb_rating": 6.2,
            "runtime": 139,
            "year": 2007,
            "genres": "action, adventure",
            "votes": 392201,
            "release_date": "2007-04-16",
            "url": "http://www.imdb.com/title/tt0413300/"
        }, {
            "position": 112,
            "const": "tt2229499",
            "created": "Sun Feb 14 01:57:33 2016",
            "modified": "Sun Feb 14 01:57:33 2016",
            "description": "",
            "title": "Don Jon",
            "type": "Feature Film",
            "directors": "Joseph Gordon-Levitt",
            "user_rating": 7,
            "imdb_rating": 6.6,
            "runtime": 90,
            "year": 2013,
            "genres": "comedy, drama, romance",
            "votes": 194401,
            "release_date": "2013-01-18",
            "url": "http://www.imdb.com/title/tt2229499/"
        }, {
            "position": 113,
            "const": "tt2802144",
            "created": "Sun Feb 14 01:57:38 2016",
            "modified": "Sun Feb 14 01:57:38 2016",
            "description": "",
            "title": "Kingsman: The Secret Service",
            "type": "Feature Film",
            "directors": "Matthew Vaughn",
            "user_rating": 6,
            "imdb_rating": 7.7,
            "runtime": 129,
            "year": 2014,
            "genres": "action, adventure, comedy, crime, thriller",
            "votes": 414320,
            "release_date": "2014-12-13",
            "url": "http://www.imdb.com/title/tt2802144/"
        }, {
            "position": 114,
            "const": "tt0398808",
            "created": "Sun Feb 14 01:57:46 2016",
            "modified": "Sun Feb 14 01:57:46 2016",
            "description": "",
            "title": "Bridge to Terabithia",
            "type": "Feature Film",
            "directors": "Gabor Csupo",
            "user_rating": 6,
            "imdb_rating": 7.2,
            "runtime": 96,
            "year": 2007,
            "genres": "adventure, drama, family, fantasy",
            "votes": 112994,
            "release_date": "2007-02-15",
            "url": "http://www.imdb.com/title/tt0398808/"
        }, {
            "position": 115,
            "const": "tt0120630",
            "created": "Sun Feb 14 01:57:52 2016",
            "modified": "Sun Feb 14 01:57:52 2016",
            "description": "",
            "title": "Chicken Run",
            "type": "Feature Film",
            "directors": "Peter Lord, Nick Park",
            "user_rating": 7,
            "imdb_rating": 7,
            "runtime": 84,
            "year": 2000,
            "genres": "animation, adventure, comedy, drama, family",
            "votes": 143297,
            "release_date": "2000-06-21",
            "url": "http://www.imdb.com/title/tt0120630/"
        }, {
            "position": 116,
            "const": "tt0082971",
            "created": "Sun Feb 14 01:58:01 2016",
            "modified": "Sun Feb 14 01:58:01 2016",
            "description": "",
            "title": "Raiders of the Lost Ark",
            "type": "Feature Film",
            "directors": "Steven Spielberg",
            "user_rating": 8,
            "imdb_rating": 8.5,
            "runtime": 115,
            "year": 1981,
            "genres": "action, adventure",
            "votes": 678179,
            "release_date": "1981-06-12",
            "url": "http://www.imdb.com/title/tt0082971/"
        }, {
            "position": 117,
            "const": "tt0087469",
            "created": "Sun Feb 14 01:58:06 2016",
            "modified": "Sun Feb 14 01:58:06 2016",
            "description": "",
            "title": "Indiana Jones and the Temple of Doom",
            "type": "Feature Film",
            "directors": "Steven Spielberg",
            "user_rating": 6,
            "imdb_rating": 7.6,
            "runtime": 118,
            "year": 1984,
            "genres": "action, adventure",
            "votes": 338906,
            "release_date": "1984-05-08",
            "url": "http://www.imdb.com/title/tt0087469/"
        }, {
            "position": 118,
            "const": "tt0097576",
            "created": "Sun Feb 14 01:58:12 2016",
            "modified": "Sun Feb 14 01:58:12 2016",
            "description": "",
            "title": "Indiana Jones and the Last Crusade",
            "type": "Feature Film",
            "directors": "Steven Spielberg",
            "user_rating": 7,
            "imdb_rating": 8.3,
            "runtime": 127,
            "year": 1989,
            "genres": "action, adventure, fantasy",
            "votes": 529795,
            "release_date": "1989-05-24",
            "url": "http://www.imdb.com/title/tt0097576/"
        }, {
            "position": 119,
            "const": "tt0364725",
            "created": "Sun Feb 14 01:58:18 2016",
            "modified": "Sun Feb 14 01:58:18 2016",
            "description": "",
            "title": "Dodgeball: A True Underdog Story",
            "type": "Feature Film",
            "directors": "Rawson Marshall Thurber",
            "user_rating": 6,
            "imdb_rating": 6.7,
            "runtime": 92,
            "year": 2004,
            "genres": "comedy, sport",
            "votes": 188745,
            "release_date": "2004-06-18",
            "url": "http://www.imdb.com/title/tt0364725/"
        }, {
            "position": 120,
            "const": "tt2166834",
            "created": "Sun Feb 14 01:58:22 2016",
            "modified": "Sun Feb 14 01:58:22 2016",
            "description": "",
            "title": "Batman: The Dark Knight Returns, Part 2",
            "type": "Video",
            "directors": "Jay Oliva",
            "user_rating": 7,
            "imdb_rating": 8.4,
            "runtime": 76,
            "year": 2013,
            "genres": "animation, action, crime, sci_fi, thriller",
            "votes": 32507,
            "release_date": "2013-01-29",
            "url": "http://www.imdb.com/title/tt2166834/"
        }, {
            "position": 121,
            "const": "tt2313197",
            "created": "Sun Feb 14 01:58:27 2016",
            "modified": "Sun Feb 14 01:58:27 2016",
            "description": "",
            "title": "Batman: The Dark Knight Returns, Part 1",
            "type": "Video",
            "directors": "Jay Oliva",
            "user_rating": 7,
            "imdb_rating": 8,
            "runtime": 76,
            "year": 2012,
            "genres": "animation, action, adventure, crime, sci_fi",
            "votes": 38645,
            "release_date": "2012-09-06",
            "url": "http://www.imdb.com/title/tt2313197/"
        }, {
            "position": 122,
            "const": "tt0154506",
            "created": "Sun Feb 14 01:58:32 2016",
            "modified": "Sun Feb 14 01:58:32 2016",
            "description": "",
            "title": "Following",
            "type": "Feature Film",
            "directors": "Christopher Nolan",
            "user_rating": 7,
            "imdb_rating": 7.6,
            "runtime": 69,
            "year": 1998,
            "genres": "crime, mystery, thriller",
            "votes": 67303,
            "release_date": "1998-09-12",
            "url": "http://www.imdb.com/title/tt0154506/"
        }, {
            "position": 123,
            "const": "tt0332379",
            "created": "Sun Feb 14 01:58:41 2016",
            "modified": "Sun Feb 14 01:58:41 2016",
            "description": "",
            "title": "School of Rock",
            "type": "Feature Film",
            "directors": "Richard Linklater",
            "user_rating": 6,
            "imdb_rating": 7.1,
            "runtime": 108,
            "year": 2003,
            "genres": "comedy, family, music",
            "votes": 215176,
            "release_date": "2003-09-09",
            "url": "http://www.imdb.com/title/tt0332379/"
        }, {
            "position": 124,
            "const": "tt0104652",
            "created": "Sun Feb 14 01:58:49 2016",
            "modified": "Sun Feb 14 01:58:49 2016",
            "description": "",
            "title": "Porco Rosso",
            "type": "Feature Film",
            "directors": "Hayao Miyazaki",
            "user_rating": 7,
            "imdb_rating": 7.8,
            "runtime": 94,
            "year": 1992,
            "genres": "animation, adventure, comedy, fantasy, romance",
            "votes": 49333,
            "release_date": "1992-07-18",
            "url": "http://www.imdb.com/title/tt0104652/"
        }, {
            "position": 125,
            "const": "tt0086879",
            "created": "Sun Feb 14 01:59:35 2016",
            "modified": "Sun Feb 14 01:59:35 2016",
            "description": "",
            "title": "Amadeus",
            "type": "Feature Film",
            "directors": "Milos Forman",
            "user_rating": null,
            "imdb_rating": 8.3,
            "runtime": 160,
            "year": 1984,
            "genres": "biography, drama, history, music",
            "votes": 278628,
            "release_date": "1984-09-06",
            "url": "http://www.imdb.com/title/tt0086879/"
        }, {
            "position": 126,
            "const": "tt0096895",
            "created": "Sun Feb 14 02:11:29 2016",
            "modified": "Sun Feb 14 02:11:29 2016",
            "description": "",
            "title": "Batman",
            "type": "Feature Film",
            "directors": "Tim Burton",
            "user_rating": 6,
            "imdb_rating": 7.6,
            "runtime": 126,
            "year": 1989,
            "genres": "action, adventure",
            "votes": 275046,
            "release_date": "1989-06-19",
            "url": "http://www.imdb.com/title/tt0096895/"
        }, {
            "position": 127,
            "const": "tt0499549",
            "created": "Sun Feb 14 02:11:34 2016",
            "modified": "Sun Feb 14 02:11:34 2016",
            "description": "",
            "title": "Avatar",
            "type": "Feature Film",
            "directors": "James Cameron",
            "user_rating": 6,
            "imdb_rating": 7.9,
            "runtime": 162,
            "year": 2009,
            "genres": "action, adventure, fantasy, sci_fi",
            "votes": 905682,
            "release_date": "2009-12-10",
            "url": "http://www.imdb.com/title/tt0499549/"
        }, {
            "position": 128,
            "const": "tt0398286",
            "created": "Sun Feb 14 02:12:07 2016",
            "modified": "Sun Feb 14 02:12:07 2016",
            "description": "",
            "title": "Tangled",
            "type": "Feature Film",
            "directors": "Nathan Greno, Byron Howard",
            "user_rating": 6,
            "imdb_rating": 7.8,
            "runtime": 100,
            "year": 2010,
            "genres": "animation, adventure, comedy, family, fantasy, musical, romance",
            "votes": 303313,
            "release_date": "2010-11-24",
            "url": "http://www.imdb.com/title/tt0398286/"
        }, {
            "position": 129,
            "const": "tt0068646",
            "created": "Sun Feb 14 02:12:18 2016",
            "modified": "Sun Feb 14 02:12:18 2016",
            "description": "",
            "title": "The Godfather",
            "type": "Feature Film",
            "directors": "Francis Ford Coppola",
            "user_rating": 9,
            "imdb_rating": 9.2,
            "runtime": 175,
            "year": 1972,
            "genres": "crime, drama",
            "votes": 1187747,
            "release_date": "1972-03-14",
            "url": "http://www.imdb.com/title/tt0068646/"
        }, {
            "position": 130,
            "const": "tt0071562",
            "created": "Sun Feb 14 02:12:29 2016",
            "modified": "Sun Feb 14 02:12:29 2016",
            "description": "",
            "title": "The Godfather: Part II",
            "type": "Feature Film",
            "directors": "Francis Ford Coppola",
            "user_rating": 9,
            "imdb_rating": 9,
            "runtime": 202,
            "year": 1974,
            "genres": "crime, drama",
            "votes": 814794,
            "release_date": "1974-12-12",
            "url": "http://www.imdb.com/title/tt0071562/"
        }, {
            "position": 131,
            "const": "tt0936501",
            "created": "Sun Feb 14 02:34:15 2016",
            "modified": "Sun Feb 14 02:34:15 2016",
            "description": "",
            "title": "Taken",
            "type": "Feature Film",
            "directors": "Pierre Morel",
            "user_rating": 6,
            "imdb_rating": 7.8,
            "runtime": 93,
            "year": 2008,
            "genres": "action, thriller",
            "votes": 492170,
            "release_date": "2008-02-27",
            "url": "http://www.imdb.com/title/tt0936501/"
        }, {
            "position": 132,
            "const": "tt1193138",
            "created": "Mon Feb 15 02:35:52 2016",
            "modified": "Mon Feb 15 02:35:52 2016",
            "description": "",
            "title": "Up in the Air",
            "type": "Feature Film",
            "directors": "Jason Reitman",
            "user_rating": 8,
            "imdb_rating": 7.4,
            "runtime": 109,
            "year": 2009,
            "genres": "drama, romance",
            "votes": 274266,
            "release_date": "2009-09-05",
            "url": "http://www.imdb.com/title/tt1193138/"
        }, {
            "position": 133,
            "const": "tt3460252",
            "created": "Tue Feb 16 02:48:58 2016",
            "modified": "Tue Feb 16 02:48:58 2016",
            "description": "",
            "title": "The Hateful Eight",
            "type": "Feature Film",
            "directors": "Quentin Tarantino",
            "user_rating": 8,
            "imdb_rating": 7.9,
            "runtime": 187,
            "year": 2015,
            "genres": "crime, drama, mystery, thriller, western",
            "votes": 303065,
            "release_date": "2015-12-07",
            "url": "http://www.imdb.com/title/tt3460252/"
        }, {
            "position": 134,
            "const": "tt1305806",
            "created": "Fri Feb 19 21:40:28 2016",
            "modified": "Fri Feb 19 21:40:28 2016",
            "description": "",
            "title": "The Secret in Their Eyes",
            "type": "Feature Film",
            "directors": "Juan José Campanella",
            "user_rating": 9,
            "imdb_rating": 8.2,
            "runtime": 129,
            "year": 2009,
            "genres": "drama, mystery, thriller",
            "votes": 137220,
            "release_date": "2009-08-13",
            "url": "http://www.imdb.com/title/tt1305806/"
        }, {
            "position": 135,
            "const": "tt1587707",
            "created": "Fri Feb 19 22:44:02 2016",
            "modified": "Fri Feb 19 22:44:02 2016",
            "description": "",
            "title": "Exit Through the Gift Shop",
            "type": "Documentary",
            "directors": "Banksy",
            "user_rating": 9,
            "imdb_rating": 8,
            "runtime": 87,
            "year": 2010,
            "genres": "documentary, comedy, crime, history",
            "votes": 52189,
            "release_date": "2010-01-24",
            "url": "http://www.imdb.com/title/tt1587707/"
        }, {
            "position": 136,
            "const": "tt1433540",
            "created": "Sat Feb 20 15:46:15 2016",
            "modified": "Sat Feb 20 15:46:15 2016",
            "description": "",
            "title": "A Town Called Panic",
            "type": "Feature Film",
            "directors": "Stéphane Aubier, Vincent Patar",
            "user_rating": 9,
            "imdb_rating": 7.5,
            "runtime": 75,
            "year": 2009,
            "genres": "animation, adventure, comedy, family, fantasy",
            "votes": 5835,
            "release_date": "2009-05-21",
            "url": "http://www.imdb.com/title/tt1433540/"
        }, {
            "position": 137,
            "const": "tt0110074",
            "created": "Mon Feb 22 02:46:38 2016",
            "modified": "Mon Feb 22 02:46:38 2016",
            "description": "",
            "title": "The Hudsucker Proxy",
            "type": "Feature Film",
            "directors": "Joel Coen",
            "user_rating": 7,
            "imdb_rating": 7.3,
            "runtime": 111,
            "year": 1994,
            "genres": "comedy, fantasy",
            "votes": 66409,
            "release_date": "1994-01",
            "url": "http://www.imdb.com/title/tt0110074/"
        }, {
            "position": 138,
            "const": "tt0475290",
            "created": "Fri Feb 26 02:17:07 2016",
            "modified": "Fri Feb 26 02:17:07 2016",
            "description": "",
            "title": "Hail, Caesar!",
            "type": "Feature Film",
            "directors": "Ethan Coen, Joel Coen",
            "user_rating": 8,
            "imdb_rating": 6.3,
            "runtime": 106,
            "year": 2016,
            "genres": "comedy, mystery",
            "votes": 73416,
            "release_date": "2016-02-01",
            "url": "http://www.imdb.com/title/tt0475290/"
        }, {
            "position": 139,
            "const": "tt3850590",
            "created": "Fri Feb 26 21:47:13 2016",
            "modified": "Fri Feb 26 21:47:13 2016",
            "description": "",
            "title": "Krampus",
            "type": "Feature Film",
            "directors": "Michael Dougherty",
            "user_rating": 6,
            "imdb_rating": 6.2,
            "runtime": 98,
            "year": 2015,
            "genres": "comedy, fantasy, horror",
            "votes": 35999,
            "release_date": "2015-11-30",
            "url": "http://www.imdb.com/title/tt3850590/"
        }, {
            "position": 140,
            "const": "tt0093058",
            "created": "Sat Feb 27 02:25:08 2016",
            "modified": "Sat Feb 27 02:25:08 2016",
            "description": "",
            "title": "Full Metal Jacket",
            "type": "Feature Film",
            "directors": "Stanley Kubrick",
            "user_rating": 9,
            "imdb_rating": 8.3,
            "runtime": 116,
            "year": 1987,
            "genres": "drama, war",
            "votes": 500009,
            "release_date": "1987-06-17",
            "url": "http://www.imdb.com/title/tt0093058/"
        }, {
            "position": 141,
            "const": "tt0120815",
            "created": "Sun Feb 28 02:43:44 2016",
            "modified": "Sun Feb 28 02:43:44 2016",
            "description": "",
            "title": "Saving Private Ryan",
            "type": "Feature Film",
            "directors": "Steven Spielberg",
            "user_rating": 7,
            "imdb_rating": 8.6,
            "runtime": 169,
            "year": 1998,
            "genres": "action, drama, war",
            "votes": 908792,
            "release_date": "1998-07-21",
            "url": "http://www.imdb.com/title/tt0120815/"
        }, {
            "position": 142,
            "const": "tt0372784",
            "created": "Tue Mar  1 01:55:10 2016",
            "modified": "Tue Mar  1 01:55:10 2016",
            "description": "",
            "title": "Batman Begins",
            "type": "Feature Film",
            "directors": "Christopher Nolan",
            "user_rating": 7,
            "imdb_rating": 8.3,
            "runtime": 140,
            "year": 2005,
            "genres": "action, adventure",
            "votes": 1008908,
            "release_date": "2005-05-31",
            "url": "http://www.imdb.com/title/tt0372784/"
        }, {
            "position": 143,
            "const": "tt0193676",
            "created": "Fri Mar  4 14:50:42 2016",
            "modified": "Fri Mar  4 14:50:42 2016",
            "description": "",
            "title": "Freaks and Geeks",
            "type": "TV Series",
            "directors": "",
            "user_rating": 7,
            "imdb_rating": 8.9,
            "runtime": 44,
            "year": 1999,
            "genres": "comedy, drama",
            "votes": 96215,
            "release_date": "1999-09-25",
            "url": "http://www.imdb.com/title/tt0193676/"
        }, {
            "position": 144,
            "const": "tt0057012",
            "created": "Sat Mar 12 01:40:24 2016",
            "modified": "Sat Mar 12 01:40:24 2016",
            "description": "",
            "title": "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
            "type": "Feature Film",
            "directors": "Stanley Kubrick",
            "user_rating": 9,
            "imdb_rating": 8.5,
            "runtime": 95,
            "year": 1964,
            "genres": "comedy",
            "votes": 351370,
            "release_date": "1964-01-29",
            "url": "http://www.imdb.com/title/tt0057012/"
        }, {
            "position": 145,
            "const": "tt0107048",
            "created": "Mon Mar 14 00:23:27 2016",
            "modified": "Mon Mar 14 00:23:27 2016",
            "description": "",
            "title": "Groundhog Day",
            "type": "Feature Film",
            "directors": "Harold Ramis",
            "user_rating": 7,
            "imdb_rating": 8.1,
            "runtime": 101,
            "year": 1993,
            "genres": "comedy, fantasy, romance",
            "votes": 450155,
            "release_date": "1993-02-04",
            "url": "http://www.imdb.com/title/tt0107048/"
        }, {
            "position": 146,
            "const": "tt0119488",
            "created": "Tue Mar 15 01:31:21 2016",
            "modified": "Tue Mar 15 01:31:21 2016",
            "description": "",
            "title": "L.A. Confidential",
            "type": "Feature Film",
            "directors": "Curtis Hanson",
            "user_rating": 7,
            "imdb_rating": 8.3,
            "runtime": 138,
            "year": 1997,
            "genres": "crime, drama, mystery, thriller",
            "votes": 424493,
            "release_date": "1997-05-14",
            "url": "http://www.imdb.com/title/tt0119488/"
        }, {
            "position": 147,
            "const": "tt0978762",
            "created": "Thu Mar 17 03:57:50 2016",
            "modified": "Thu Mar 17 03:57:50 2016",
            "description": "",
            "title": "Mary and Max",
            "type": "Feature Film",
            "directors": "Adam Elliot",
            "user_rating": 9,
            "imdb_rating": 8.2,
            "runtime": 92,
            "year": 2009,
            "genres": "animation, comedy, drama",
            "votes": 123489,
            "release_date": "2009-01-15",
            "url": "http://www.imdb.com/title/tt0978762/"
        }, {
            "position": 148,
            "const": "tt4263482",
            "created": "Fri Mar 18 05:06:05 2016",
            "modified": "Fri Mar 18 05:06:05 2016",
            "description": "",
            "title": "The Witch",
            "type": "Feature Film",
            "directors": "Robert Eggers",
            "user_rating": 7,
            "imdb_rating": 6.7,
            "runtime": 92,
            "year": 2015,
            "genres": "horror, mystery",
            "votes": 83469,
            "release_date": "2015-01-23",
            "url": "http://www.imdb.com/title/tt4263482/"
        }, {
            "position": 149,
            "const": "tt0120735",
            "created": "Sat Mar 19 00:51:22 2016",
            "modified": "Sat Mar 19 00:51:22 2016",
            "description": "",
            "title": "Lock, Stock and Two Smoking Barrels",
            "type": "Feature Film",
            "directors": "Guy Ritchie",
            "user_rating": 7,
            "imdb_rating": 8.2,
            "runtime": 107,
            "year": 1998,
            "genres": "comedy, crime",
            "votes": 425217,
            "release_date": "1998-08-23",
            "url": "http://www.imdb.com/title/tt0120735/"
        }, {
            "position": 150,
            "const": "tt0047396",
            "created": "Sun Mar 20 03:02:55 2016",
            "modified": "Sun Mar 20 03:02:55 2016",
            "description": "",
            "title": "Rear Window",
            "type": "Feature Film",
            "directors": "Alfred Hitchcock",
            "user_rating": 7,
            "imdb_rating": 8.5,
            "runtime": 112,
            "year": 1954,
            "genres": "mystery, thriller",
            "votes": 325534,
            "release_date": "1954-08-04",
            "url": "http://www.imdb.com/title/tt0047396/"
        }, {
            "position": 151,
            "const": "tt0272338",
            "created": "Wed Mar 23 04:32:30 2016",
            "modified": "Wed Mar 23 04:32:30 2016",
            "description": "",
            "title": "Punch-Drunk Love",
            "type": "Feature Film",
            "directors": "Paul Thomas Anderson",
            "user_rating": 8,
            "imdb_rating": 7.3,
            "runtime": 95,
            "year": 2002,
            "genres": "comedy, drama, romance, thriller",
            "votes": 112475,
            "release_date": "2002-05-19",
            "url": "http://www.imdb.com/title/tt0272338/"
        }, {
            "position": 152,
            "const": "tt0114746",
            "created": "Fri Mar 25 03:09:57 2016",
            "modified": "Fri Mar 25 03:09:57 2016",
            "description": "",
            "title": "Twelve Monkeys",
            "type": "Feature Film",
            "directors": "Terry Gilliam",
            "user_rating": 10,
            "imdb_rating": 8,
            "runtime": 129,
            "year": 1995,
            "genres": "mystery, sci_fi, thriller",
            "votes": 474074,
            "release_date": "1995-12-27",
            "url": "http://www.imdb.com/title/tt0114746/"
        }, {
            "position": 153,
            "const": "tt0907657",
            "created": "Fri Mar 25 18:51:53 2016",
            "modified": "Fri Mar 25 18:51:53 2016",
            "description": "",
            "title": "Once",
            "type": "Feature Film",
            "directors": "John Carney",
            "user_rating": 7,
            "imdb_rating": 7.9,
            "runtime": 85,
            "year": 2007,
            "genres": "drama, music, romance",
            "votes": 93325,
            "release_date": "2007-01-20",
            "url": "http://www.imdb.com/title/tt0907657/"
        }, {
            "position": 154,
            "const": "tt0061722",
            "created": "Sat Mar 26 17:51:18 2016",
            "modified": "Sat Mar 26 17:51:18 2016",
            "description": "",
            "title": "The Graduate",
            "type": "Feature Film",
            "directors": "Mike Nichols",
            "user_rating": 7,
            "imdb_rating": 8,
            "runtime": 106,
            "year": 1967,
            "genres": "comedy, drama",
            "votes": 213843,
            "release_date": "1967-12-21",
            "url": "http://www.imdb.com/title/tt0061722/"
        }, {
            "position": 155,
            "const": "tt0073486",
            "created": "Sat Mar 26 17:51:53 2016",
            "modified": "Sat Mar 26 17:51:53 2016",
            "description": "",
            "title": "One Flew Over the Cuckoo's Nest",
            "type": "Feature Film",
            "directors": "Milos Forman",
            "user_rating": 9,
            "imdb_rating": 8.7,
            "runtime": 133,
            "year": 1975,
            "genres": "drama",
            "votes": 697989,
            "release_date": "1975-11-19",
            "url": "http://www.imdb.com/title/tt0073486/"
        }, {
            "position": 156,
            "const": "tt0079470",
            "created": "Sun Mar 27 03:59:24 2016",
            "modified": "Sun Mar 27 03:59:24 2016",
            "description": "",
            "title": "Life of Brian",
            "type": "Feature Film",
            "directors": "Terry Jones",
            "user_rating": 7,
            "imdb_rating": 8.1,
            "runtime": 94,
            "year": 1979,
            "genres": "comedy",
            "votes": 279660,
            "release_date": "1979-08-17",
            "url": "http://www.imdb.com/title/tt0079470/"
        }, {
            "position": 157,
            "const": "tt0253474",
            "created": "Mon Mar 28 03:22:52 2016",
            "modified": "Mon Mar 28 03:22:52 2016",
            "description": "",
            "title": "The Pianist",
            "type": "Feature Film",
            "directors": "Roman Polanski",
            "user_rating": 9,
            "imdb_rating": 8.5,
            "runtime": 150,
            "year": 2002,
            "genres": "biography, drama, war",
            "votes": 516202,
            "release_date": "2002-05-24",
            "url": "http://www.imdb.com/title/tt0253474/"
        }, {
            "position": 158,
            "const": "tt1226236",
            "created": "Thu Mar 31 22:14:16 2016",
            "modified": "Thu Mar 31 22:14:16 2016",
            "description": "",
            "title": "I Am Love",
            "type": "Feature Film",
            "directors": "Luca Guadagnino",
            "user_rating": 8,
            "imdb_rating": 7,
            "runtime": 120,
            "year": 2009,
            "genres": "drama, romance",
            "votes": 14446,
            "release_date": "2009-09-05",
            "url": "http://www.imdb.com/title/tt1226236/"
        }, {
            "position": 159,
            "const": "tt0042876",
            "created": "Fri Apr  1 16:37:45 2016",
            "modified": "Fri Apr  1 16:37:45 2016",
            "description": "",
            "title": "Rashomon",
            "type": "Feature Film",
            "directors": "Akira Kurosawa",
            "user_rating": 8,
            "imdb_rating": 8.3,
            "runtime": 88,
            "year": 1950,
            "genres": "crime, drama, mystery",
            "votes": 105928,
            "release_date": "1950-08-26",
            "url": "http://www.imdb.com/title/tt0042876/"
        }, {
            "position": 160,
            "const": "tt0108255",
            "created": "Sat Apr  2 23:58:56 2016",
            "modified": "Sat Apr  2 23:58:56 2016",
            "description": "",
            "title": "Super Mario Bros.",
            "type": "Feature Film",
            "directors": "Annabel Jankel, Rocky Morton",
            "user_rating": 3,
            "imdb_rating": 4,
            "runtime": 104,
            "year": 1993,
            "genres": "adventure, comedy, family, fantasy, sci_fi",
            "votes": 38971,
            "release_date": "1993-05-28",
            "url": "http://www.imdb.com/title/tt0108255/"
        }, {
            "position": 161,
            "const": "tt0844471",
            "created": "Sun Apr  3 01:30:28 2016",
            "modified": "Sun Apr  3 01:30:28 2016",
            "description": "",
            "title": "Cloudy with a Chance of Meatballs",
            "type": "Feature Film",
            "directors": "Phil Lord, Chris Miller",
            "user_rating": 7,
            "imdb_rating": 7,
            "runtime": 90,
            "year": 2009,
            "genres": "animation, comedy, family, fantasy, sci_fi",
            "votes": 156825,
            "release_date": "2009-09-16",
            "url": "http://www.imdb.com/title/tt0844471/"
        }, {
            "position": 162,
            "const": "tt2265171",
            "created": "Mon Apr  4 04:57:05 2016",
            "modified": "Mon Apr  4 04:57:05 2016",
            "description": "",
            "title": "The Raid 2",
            "type": "Feature Film",
            "directors": "Gareth Evans",
            "user_rating": 7,
            "imdb_rating": 8,
            "runtime": 150,
            "year": 2014,
            "genres": "action, crime, thriller",
            "votes": 87438,
            "release_date": "2014-01-21",
            "url": "http://www.imdb.com/title/tt2265171/"
        }, {
            "position": 163,
            "const": "tt1125849",
            "created": "Tue Apr  5 04:55:58 2016",
            "modified": "Tue Apr  5 04:55:58 2016",
            "description": "",
            "title": "The Wrestler",
            "type": "Feature Film",
            "directors": "Darren Aronofsky",
            "user_rating": 7,
            "imdb_rating": 7.9,
            "runtime": 109,
            "year": 2008,
            "genres": "drama, sport",
            "votes": 254893,
            "release_date": "2008-09-05",
            "url": "http://www.imdb.com/title/tt1125849/"
        }, {
            "position": 164,
            "const": "tt0093822",
            "created": "Wed Apr  6 14:55:28 2016",
            "modified": "Wed Apr  6 14:55:28 2016",
            "description": "",
            "title": "Raising Arizona",
            "type": "Feature Film",
            "directors": "Joel Coen",
            "user_rating": 7,
            "imdb_rating": 7.4,
            "runtime": 94,
            "year": 1987,
            "genres": "comedy, crime",
            "votes": 102740,
            "release_date": "1987-03-06",
            "url": "http://www.imdb.com/title/tt0093822/"
        }, {
            "position": 165,
            "const": "tt0800080",
            "created": "Thu Apr  7 02:58:30 2016",
            "modified": "Thu Apr  7 02:58:30 2016",
            "description": "",
            "title": "The Incredible Hulk",
            "type": "Feature Film",
            "directors": "Louis Leterrier",
            "user_rating": 6,
            "imdb_rating": 6.8,
            "runtime": 112,
            "year": 2008,
            "genres": "action, adventure, sci_fi",
            "votes": 333446,
            "release_date": "2008-06-06",
            "url": "http://www.imdb.com/title/tt0800080/"
        }, {
            "position": 166,
            "const": "tt0409459",
            "created": "Thu Apr  7 05:01:30 2016",
            "modified": "Thu Apr  7 05:01:30 2016",
            "description": "",
            "title": "Watchmen",
            "type": "Feature Film",
            "directors": "Zack Snyder",
            "user_rating": 6,
            "imdb_rating": 7.6,
            "runtime": 162,
            "year": 2009,
            "genres": "action, drama, mystery, sci_fi",
            "votes": 400060,
            "release_date": "2009-02-23",
            "url": "http://www.imdb.com/title/tt0409459/"
        }, {
            "position": 167,
            "const": "tt0185937",
            "created": "Fri Apr  8 04:03:26 2016",
            "modified": "Fri Apr  8 04:03:26 2016",
            "description": "",
            "title": "The Blair Witch Project",
            "type": "Feature Film",
            "directors": "Daniel Myrick, Eduardo Sanchez",
            "user_rating": 7,
            "imdb_rating": 6.4,
            "runtime": 81,
            "year": 1999,
            "genres": "horror",
            "votes": 194102,
            "release_date": "1999-01-25",
            "url": "http://www.imdb.com/title/tt0185937/"
        }, {
            "position": 168,
            "const": "tt0118749",
            "created": "Sun Apr 10 17:35:46 2016",
            "modified": "Sun Apr 10 17:35:46 2016",
            "description": "",
            "title": "Boogie Nights",
            "type": "Feature Film",
            "directors": "Paul Thomas Anderson",
            "user_rating": 9,
            "imdb_rating": 7.9,
            "runtime": 155,
            "year": 1997,
            "genres": "drama",
            "votes": 192839,
            "release_date": "1997-09-11",
            "url": "http://www.imdb.com/title/tt0118749/"
        }, {
            "position": 169,
            "const": "tt1675192",
            "created": "Wed Apr 13 01:45:55 2016",
            "modified": "Wed Apr 13 01:45:55 2016",
            "description": "",
            "title": "Take Shelter",
            "type": "Feature Film",
            "directors": "Jeff Nichols",
            "user_rating": 8,
            "imdb_rating": 7.4,
            "runtime": 121,
            "year": 2011,
            "genres": "drama, thriller",
            "votes": 70946,
            "release_date": "2011-01-24",
            "url": "http://www.imdb.com/title/tt1675192/"
        }, {
            "position": 170,
            "const": "tt0952682",
            "created": "Thu Apr 14 05:33:11 2016",
            "modified": "Thu Apr 14 05:33:11 2016",
            "description": "",
            "title": "Shotgun Stories",
            "type": "Feature Film",
            "directors": "Jeff Nichols",
            "user_rating": 7,
            "imdb_rating": 7.3,
            "runtime": 92,
            "year": 2007,
            "genres": "drama, thriller",
            "votes": 7456,
            "release_date": "2007-02-14",
            "url": "http://www.imdb.com/title/tt0952682/"
        }, {
            "position": 171,
            "const": "tt2649554",
            "created": "Mon Apr 25 01:59:08 2016",
            "modified": "Mon Apr 25 01:59:08 2016",
            "description": "",
            "title": "Midnight Special",
            "type": "Feature Film",
            "directors": "Jeff Nichols",
            "user_rating": 7,
            "imdb_rating": 6.7,
            "runtime": 112,
            "year": 2016,
            "genres": "adventure, drama, mystery, sci_fi, thriller",
            "votes": 42838,
            "release_date": "2016-02-12",
            "url": "http://www.imdb.com/title/tt2649554/"
        }, {
            "position": 172,
            "const": "tt1034032",
            "created": "Wed May 11 22:27:25 2016",
            "modified": "Wed May 11 22:27:25 2016",
            "description": "",
            "title": "Gamer",
            "type": "Feature Film",
            "directors": "Neveldine, Taylor",
            "user_rating": 8,
            "imdb_rating": 5.8,
            "runtime": 95,
            "year": 2009,
            "genres": "action, sci_fi, thriller",
            "votes": 115078,
            "release_date": "2009-09-03",
            "url": "http://www.imdb.com/title/tt1034032/"
        }, {
            "position": 173,
            "const": "tt1276104",
            "created": "Sun May 15 00:54:30 2016",
            "modified": "Sun May 15 00:54:30 2016",
            "description": "",
            "title": "Looper",
            "type": "Feature Film",
            "directors": "Rian Johnson",
            "user_rating": 7,
            "imdb_rating": 7.4,
            "runtime": 119,
            "year": 2012,
            "genres": "action, crime, drama, sci_fi, thriller",
            "votes": 438489,
            "release_date": "2012-09-06",
            "url": "http://www.imdb.com/title/tt1276104/"
        }, {
            "position": 174,
            "const": "tt0338751",
            "created": "Fri May 20 04:30:43 2016",
            "modified": "Fri May 20 04:30:43 2016",
            "description": "",
            "title": "The Aviator",
            "type": "Feature Film",
            "directors": "Martin Scorsese",
            "user_rating": 7,
            "imdb_rating": 7.5,
            "runtime": 170,
            "year": 2004,
            "genres": "biography, drama",
            "votes": 270312,
            "release_date": "2004-12-14",
            "url": "http://www.imdb.com/title/tt0338751/"
        }, {
            "position": 175,
            "const": "tt0112471",
            "created": "Wed May 25 04:54:22 2016",
            "modified": "Wed May 25 04:54:22 2016",
            "description": "",
            "title": "Before Sunrise",
            "type": "Feature Film",
            "directors": "Richard Linklater",
            "user_rating": 9,
            "imdb_rating": 8.1,
            "runtime": 105,
            "year": 1995,
            "genres": "drama, romance",
            "votes": 190161,
            "release_date": "1995-01-24",
            "url": "http://www.imdb.com/title/tt0112471/"
        }, {
            "position": 176,
            "const": "tt0381681",
            "created": "Thu May 26 05:08:38 2016",
            "modified": "Thu May 26 05:08:38 2016",
            "description": "",
            "title": "Before Sunset",
            "type": "Feature Film",
            "directors": "Richard Linklater",
            "user_rating": 8,
            "imdb_rating": 8,
            "runtime": 80,
            "year": 2004,
            "genres": "drama, romance",
            "votes": 172667,
            "release_date": "2004-02-10",
            "url": "http://www.imdb.com/title/tt0381681/"
        }, {
            "position": 177,
            "const": "tt2209418",
            "created": "Sun May 29 01:58:10 2016",
            "modified": "Sun May 29 01:58:10 2016",
            "description": "",
            "title": "Before Midnight",
            "type": "Feature Film",
            "directors": "Richard Linklater",
            "user_rating": 8,
            "imdb_rating": 7.9,
            "runtime": 109,
            "year": 2013,
            "genres": "drama, romance",
            "votes": 99110,
            "release_date": "2013-01-20",
            "url": "http://www.imdb.com/title/tt2209418/"
        }, {
            "position": 178,
            "const": "tt2427892",
            "created": "Mon May 30 05:07:44 2016",
            "modified": "Mon May 30 05:07:44 2016",
            "description": "",
            "title": "Tom at the Farm",
            "type": "Feature Film",
            "directors": "Xavier Dolan",
            "user_rating": 8,
            "imdb_rating": 7,
            "runtime": 102,
            "year": 2013,
            "genres": "drama, thriller",
            "votes": 9830,
            "release_date": "2013-09-02",
            "url": "http://www.imdb.com/title/tt2427892/"
        }, {
            "position": 179,
            "const": "tt2347569",
            "created": "Tue May 31 05:01:19 2016",
            "modified": "Tue May 31 05:01:19 2016",
            "description": "",
            "title": "Frances Ha",
            "type": "Feature Film",
            "directors": "Noah Baumbach",
            "user_rating": 7,
            "imdb_rating": 7.4,
            "runtime": 86,
            "year": 2012,
            "genres": "comedy, drama, romance",
            "votes": 45725,
            "release_date": "2012-09-01",
            "url": "http://www.imdb.com/title/tt2347569/"
        }, {
            "position": 180,
            "const": "tt0095489",
            "created": "Wed Jun  1 05:06:46 2016",
            "modified": "Wed Jun  1 05:06:46 2016",
            "description": "",
            "title": "The Land Before Time",
            "type": "Feature Film",
            "directors": "Don Bluth",
            "user_rating": null,
            "imdb_rating": 7.3,
            "runtime": 69,
            "year": 1988,
            "genres": "animation, adventure, drama, family",
            "votes": 63059,
            "release_date": "1988-11-18",
            "url": "http://www.imdb.com/title/tt0095489/"
        }, {
            "position": 181,
            "const": "tt2334873",
            "created": "Thu Jun  2 00:47:11 2016",
            "modified": "Thu Jun  2 00:47:11 2016",
            "description": "",
            "title": "Blue Jasmine",
            "type": "Feature Film",
            "directors": "Woody Allen",
            "user_rating": 7,
            "imdb_rating": 7.3,
            "runtime": 98,
            "year": 2013,
            "genres": "drama",
            "votes": 154506,
            "release_date": "2013-07-22",
            "url": "http://www.imdb.com/title/tt2334873/"
        }, {
            "position": 182,
            "const": "tt1942884",
            "created": "Thu Jun  2 01:59:20 2016",
            "modified": "Thu Jun  2 01:59:20 2016",
            "description": "",
            "title": "Indie Game: The Movie",
            "type": "Documentary",
            "directors": "Lisanne Pajot, James Swirsky",
            "user_rating": 8,
            "imdb_rating": 7.7,
            "runtime": 94,
            "year": 2012,
            "genres": "documentary",
            "votes": 17360,
            "release_date": "2012-01-20",
            "url": "http://www.imdb.com/title/tt1942884/"
        }, {
            "position": 183,
            "const": "tt1152758",
            "created": "Thu Jun  2 02:01:06 2016",
            "modified": "Thu Jun  2 02:01:06 2016",
            "description": "",
            "title": "Dear Zachary: A Letter to a Son About His Father",
            "type": "Documentary",
            "directors": "Kurt Kuenne",
            "user_rating": 9,
            "imdb_rating": 8.6,
            "runtime": 95,
            "year": 2008,
            "genres": "documentary, crime, drama",
            "votes": 22748,
            "release_date": "2008-01",
            "url": "http://www.imdb.com/title/tt1152758/"
        }, {
            "position": 184,
            "const": "tt0428803",
            "created": "Thu Jun  2 02:01:38 2016",
            "modified": "Thu Jun  2 02:01:38 2016",
            "description": "",
            "title": "March of the Penguins",
            "type": "Documentary",
            "directors": "Luc Jacquet",
            "user_rating": 8,
            "imdb_rating": 7.6,
            "runtime": 80,
            "year": 2005,
            "genres": "documentary",
            "votes": 47386,
            "release_date": "2005-01-21",
            "url": "http://www.imdb.com/title/tt0428803/"
        }, {
            "position": 185,
            "const": "tt2375605",
            "created": "Thu Jun  2 02:01:47 2016",
            "modified": "Thu Jun  2 02:01:47 2016",
            "description": "",
            "title": "The Act of Killing",
            "type": "Documentary",
            "directors": "Joshua Oppenheimer, Anonymous",
            "user_rating": 8,
            "imdb_rating": 8.2,
            "runtime": 115,
            "year": 2012,
            "genres": "documentary, biography, crime, history",
            "votes": 25234,
            "release_date": "2012-08-31",
            "url": "http://www.imdb.com/title/tt2375605/"
        }, {
            "position": 186,
            "const": "tt0493459",
            "created": "Thu Jun  2 02:03:56 2016",
            "modified": "Thu Jun  2 02:03:56 2016",
            "description": "",
            "title": "This Film Is Not Yet Rated",
            "type": "Documentary",
            "directors": "Kirby Dick",
            "user_rating": 7,
            "imdb_rating": 7.5,
            "runtime": 98,
            "year": 2006,
            "genres": "documentary",
            "votes": 25497,
            "release_date": "2006-01-25",
            "url": "http://www.imdb.com/title/tt0493459/"
        }, {
            "position": 187,
            "const": "tt1465522",
            "created": "Fri Jun  3 04:49:39 2016",
            "modified": "Fri Jun  3 04:49:39 2016",
            "description": "",
            "title": "Tucker and Dale vs Evil",
            "type": "Feature Film",
            "directors": "Eli Craig",
            "user_rating": 7,
            "imdb_rating": 7.6,
            "runtime": 89,
            "year": 2010,
            "genres": "comedy, horror",
            "votes": 131901,
            "release_date": "2010-01-22",
            "url": "http://www.imdb.com/title/tt1465522/"
        }, {
            "position": 188,
            "const": "tt1440292",
            "created": "Sat Jun  4 04:37:37 2016",
            "modified": "Sat Jun  4 04:37:37 2016",
            "description": "",
            "title": "Submarine",
            "type": "Feature Film",
            "directors": "Richard Ayoade",
            "user_rating": 8,
            "imdb_rating": 7.3,
            "runtime": 97,
            "year": 2010,
            "genres": "comedy, drama, romance",
            "votes": 68214,
            "release_date": "2010-09-12",
            "url": "http://www.imdb.com/title/tt1440292/"
        }, {
            "position": 189,
            "const": "tt1315981",
            "created": "Sat Jun  4 19:05:41 2016",
            "modified": "Sat Jun  4 19:05:41 2016",
            "description": "",
            "title": "A Single Man",
            "type": "Feature Film",
            "directors": "Tom Ford",
            "user_rating": 9,
            "imdb_rating": 7.6,
            "runtime": 99,
            "year": 2009,
            "genres": "drama, romance",
            "votes": 85965,
            "release_date": "2009-09-11",
            "url": "http://www.imdb.com/title/tt1315981/"
        }, {
            "position": 190,
            "const": "tt0926084",
            "created": "Sat Jun  4 20:54:04 2016",
            "modified": "Sat Jun  4 20:54:04 2016",
            "description": "",
            "title": "Harry Potter and the Deathly Hallows: Part 1",
            "type": "Feature Film",
            "directors": "David Yates",
            "user_rating": 5,
            "imdb_rating": 7.7,
            "runtime": 146,
            "year": 2010,
            "genres": "adventure, family, fantasy, mystery",
            "votes": 340228,
            "release_date": "2010-11-11",
            "url": "http://www.imdb.com/title/tt0926084/"
        }, {
            "position": 191,
            "const": "tt1201607",
            "created": "Sat Jun  4 20:54:32 2016",
            "modified": "Sat Jun  4 20:54:32 2016",
            "description": "",
            "title": "Harry Potter and the Deathly Hallows: Part 2",
            "type": "Feature Film",
            "directors": "David Yates",
            "user_rating": 7,
            "imdb_rating": 8.1,
            "runtime": 130,
            "year": 2011,
            "genres": "adventure, drama, fantasy, mystery",
            "votes": 561924,
            "release_date": "2011-07-07",
            "url": "http://www.imdb.com/title/tt1201607/"
        }, {
            "position": 192,
            "const": "tt1503769",
            "created": "Sun Jun  5 23:18:57 2016",
            "modified": "Sun Jun  5 23:18:57 2016",
            "description": "",
            "title": "Collapse",
            "type": "Documentary",
            "directors": "Chris Smith",
            "user_rating": 7,
            "imdb_rating": 7.8,
            "runtime": 82,
            "year": 2009,
            "genres": "documentary",
            "votes": 5977,
            "release_date": "2009-09-12",
            "url": "http://www.imdb.com/title/tt1503769/"
        }, {
            "position": 193,
            "const": "tt0482571",
            "created": "Mon Jun  6 14:39:34 2016",
            "modified": "Mon Jun  6 14:39:34 2016",
            "description": "",
            "title": "The Prestige",
            "type": "Feature Film",
            "directors": "Christopher Nolan",
            "user_rating": 7,
            "imdb_rating": 8.5,
            "runtime": 130,
            "year": 2006,
            "genres": "drama, mystery, sci_fi, thriller",
            "votes": 871671,
            "release_date": "2006-10-17",
            "url": "http://www.imdb.com/title/tt0482571/"
        }, {
            "position": 194,
            "const": "tt1345836",
            "created": "Mon Jun  6 14:40:26 2016",
            "modified": "Mon Jun  6 14:40:26 2016",
            "description": "",
            "title": "The Dark Knight Rises",
            "type": "Feature Film",
            "directors": "Christopher Nolan",
            "user_rating": 7,
            "imdb_rating": 8.5,
            "runtime": 164,
            "year": 2012,
            "genres": "action, thriller",
            "votes": 1176489,
            "release_date": "2012-07-16",
            "url": "http://www.imdb.com/title/tt1345836/"
        }, {
            "position": 195,
            "const": "tt0361596",
            "created": "Tue Jun  7 02:44:29 2016",
            "modified": "Tue Jun  7 02:44:29 2016",
            "description": "",
            "title": "Fahrenheit 9/11",
            "type": "Documentary",
            "directors": "Michael Moore",
            "user_rating": 7,
            "imdb_rating": 7.5,
            "runtime": 122,
            "year": 2004,
            "genres": "documentary, drama, war",
            "votes": 114674,
            "release_date": "2004-05-17",
            "url": "http://www.imdb.com/title/tt0361596/"
        }, {
            "position": 196,
            "const": "tt0386032",
            "created": "Wed Jun  8 02:58:01 2016",
            "modified": "Wed Jun  8 02:58:01 2016",
            "description": "",
            "title": "Sicko",
            "type": "Documentary",
            "directors": "Michael Moore",
            "user_rating": 8,
            "imdb_rating": 8,
            "runtime": 123,
            "year": 2007,
            "genres": "documentary, drama",
            "votes": 67539,
            "release_date": "2007-05-19",
            "url": "http://www.imdb.com/title/tt0386032/"
        }, {
            "position": 197,
            "const": "tt0109445",
            "created": "Fri Jun 10 01:42:26 2016",
            "modified": "Fri Jun 10 01:42:26 2016",
            "description": "",
            "title": "Clerks",
            "type": "Feature Film",
            "directors": "Kevin Smith",
            "user_rating": 7,
            "imdb_rating": 7.8,
            "runtime": 92,
            "year": 1994,
            "genres": "comedy",
            "votes": 184558,
            "release_date": "1994-01",
            "url": "http://www.imdb.com/title/tt0109445/"
        }, {
            "position": 198,
            "const": "tt1121931",
            "created": "Fri Jun 10 01:43:22 2016",
            "modified": "Fri Jun 10 01:43:22 2016",
            "description": "",
            "title": "Crank: High Voltage",
            "type": "Feature Film",
            "directors": "Neveldine, Taylor",
            "user_rating": 7,
            "imdb_rating": 6.2,
            "runtime": 96,
            "year": 2009,
            "genres": "action, crime, thriller",
            "votes": 115205,
            "release_date": "2009-04-16",
            "url": "http://www.imdb.com/title/tt1121931/"
        }, {
            "position": 199,
            "const": "tt4226388",
            "created": "Fri Jun 10 19:36:04 2016",
            "modified": "Fri Jun 10 19:36:04 2016",
            "description": "",
            "title": "Victoria",
            "type": "Feature Film",
            "directors": "Sebastian Schipper",
            "user_rating": 7,
            "imdb_rating": 7.7,
            "runtime": 138,
            "year": 2015,
            "genres": "crime, drama, romance, thriller",
            "votes": 29867,
            "release_date": "2015-02-07",
            "url": "http://www.imdb.com/title/tt4226388/"
        }, {
            "position": 200,
            "const": "tt3235888",
            "created": "Fri Jun 10 19:39:21 2016",
            "modified": "Fri Jun 10 19:39:21 2016",
            "description": "",
            "title": "It Follows",
            "type": "Feature Film",
            "directors": "David Robert Mitchell",
            "user_rating": 8,
            "imdb_rating": 6.9,
            "runtime": 100,
            "year": 2014,
            "genres": "horror, mystery",
            "votes": 122854,
            "release_date": "2014-05-17",
            "url": "http://www.imdb.com/title/tt3235888/"
        }, {
            "position": 201,
            "const": "tt0078748",
            "created": "Fri Jun 10 19:40:54 2016",
            "modified": "Fri Jun 10 19:40:54 2016",
            "description": "",
            "title": "Alien",
            "type": "Feature Film",
            "directors": "Ridley Scott",
            "user_rating": 8,
            "imdb_rating": 8.5,
            "runtime": 117,
            "year": 1979,
            "genres": "horror, sci_fi",
            "votes": 580850,
            "release_date": "1979-05-25",
            "url": "http://www.imdb.com/title/tt0078748/"
        }, {
            "position": 202,
            "const": "tt0942385",
            "created": "Fri Jun 10 19:51:35 2016",
            "modified": "Fri Jun 10 19:51:35 2016",
            "description": "",
            "title": "Tropic Thunder",
            "type": "Feature Film",
            "directors": "Ben Stiller",
            "user_rating": 7,
            "imdb_rating": 7,
            "runtime": 107,
            "year": 2008,
            "genres": "action, comedy",
            "votes": 312901,
            "release_date": "2008-08-13",
            "url": "http://www.imdb.com/title/tt0942385/"
        }, {
            "position": 203,
            "const": "tt1979320",
            "created": "Fri Jun 10 19:52:48 2016",
            "modified": "Fri Jun 10 19:52:48 2016",
            "description": "",
            "title": "Rush",
            "type": "Feature Film",
            "directors": "Ron Howard",
            "user_rating": 7,
            "imdb_rating": 8.1,
            "runtime": 123,
            "year": 2013,
            "genres": "action, biography, drama, sport",
            "votes": 324165,
            "release_date": "2013-09-02",
            "url": "http://www.imdb.com/title/tt1979320/"
        }, {
            "position": 204,
            "const": "tt0090605",
            "created": "Fri Jun 10 19:54:09 2016",
            "modified": "Fri Jun 10 19:54:09 2016",
            "description": "",
            "title": "Aliens",
            "type": "Feature Film",
            "directors": "James Cameron",
            "user_rating": 7,
            "imdb_rating": 8.4,
            "runtime": 137,
            "year": 1986,
            "genres": "action, adventure, sci_fi, thriller",
            "votes": 500675,
            "release_date": "1986-07-14",
            "url": "http://www.imdb.com/title/tt0090605/"
        }, {
            "position": 205,
            "const": "tt0162222",
            "created": "Fri Jun 10 19:56:22 2016",
            "modified": "Fri Jun 10 19:56:22 2016",
            "description": "",
            "title": "Cast Away",
            "type": "Feature Film",
            "directors": "Robert Zemeckis",
            "user_rating": 7,
            "imdb_rating": 7.7,
            "runtime": 143,
            "year": 2000,
            "genres": "adventure, drama, romance",
            "votes": 404914,
            "release_date": "2000-12-07",
            "url": "http://www.imdb.com/title/tt0162222/"
        }, {
            "position": 206,
            "const": "tt0119174",
            "created": "Fri Jun 10 19:59:35 2016",
            "modified": "Fri Jun 10 19:59:35 2016",
            "description": "",
            "title": "The Game",
            "type": "Feature Film",
            "directors": "David Fincher",
            "user_rating": 7,
            "imdb_rating": 7.8,
            "runtime": 129,
            "year": 1997,
            "genres": "drama, mystery, thriller",
            "votes": 268391,
            "release_date": "1997-09-03",
            "url": "http://www.imdb.com/title/tt0119174/"
        }, {
            "position": 207,
            "const": "tt0831387",
            "created": "Fri Jun 10 20:11:16 2016",
            "modified": "Fri Jun 10 20:11:16 2016",
            "description": "",
            "title": "Godzilla",
            "type": "Feature Film",
            "directors": "Gareth Edwards",
            "user_rating": 6,
            "imdb_rating": 6.5,
            "runtime": 123,
            "year": 2014,
            "genres": "action, adventure, sci_fi, thriller",
            "votes": 306972,
            "release_date": "2014-05-08",
            "url": "http://www.imdb.com/title/tt0831387/"
        }, {
            "position": 208,
            "const": "tt1139328",
            "created": "Sat Jun 11 18:34:06 2016",
            "modified": "Sat Jun 11 18:34:06 2016",
            "description": "",
            "title": "The Ghost Writer",
            "type": "Feature Film",
            "directors": "Roman Polanski",
            "user_rating": 9,
            "imdb_rating": 7.2,
            "runtime": 128,
            "year": 2010,
            "genres": "mystery, thriller",
            "votes": 134544,
            "release_date": "2010-02-12",
            "url": "http://www.imdb.com/title/tt1139328/"
        }, {
            "position": 209,
            "const": "tt1379182",
            "created": "Sun Jun 12 05:32:57 2016",
            "modified": "Sun Jun 12 05:32:57 2016",
            "description": "",
            "title": "Dogtooth",
            "type": "Feature Film",
            "directors": "Yorgos Lanthimos",
            "user_rating": 9,
            "imdb_rating": 7.3,
            "runtime": 94,
            "year": 2009,
            "genres": "drama, thriller",
            "votes": 47405,
            "release_date": "2009-05-18",
            "url": "http://www.imdb.com/title/tt1379182/"
        }, {
            "position": 210,
            "const": "tt1588170",
            "created": "Mon Jun 13 00:55:05 2016",
            "modified": "Mon Jun 13 00:55:05 2016",
            "description": "",
            "title": "I Saw the Devil",
            "type": "Feature Film",
            "directors": "Kim Jee-woon",
            "user_rating": 8,
            "imdb_rating": 7.8,
            "runtime": 141,
            "year": 2010,
            "genres": "action, crime, drama, horror, thriller",
            "votes": 73943,
            "release_date": "2010-08-12",
            "url": "http://www.imdb.com/title/tt1588170/"
        }, {
            "position": 211,
            "const": "tt1605783",
            "created": "Tue Jun 14 05:07:48 2016",
            "modified": "Tue Jun 14 05:07:48 2016",
            "description": "",
            "title": "Midnight in Paris",
            "type": "Feature Film",
            "directors": "Woody Allen",
            "user_rating": 9,
            "imdb_rating": 7.7,
            "runtime": 94,
            "year": 2011,
            "genres": "comedy, fantasy, romance",
            "votes": 308645,
            "release_date": "2011-05-11",
            "url": "http://www.imdb.com/title/tt1605783/"
        }, {
            "position": 212,
            "const": "tt1232207",
            "created": "Wed Jun 15 01:17:14 2016",
            "modified": "Wed Jun 15 01:17:14 2016",
            "description": "",
            "title": "Capitalism: A Love Story",
            "type": "Documentary",
            "directors": "Michael Moore",
            "user_rating": 7,
            "imdb_rating": 7.4,
            "runtime": 127,
            "year": 2009,
            "genres": "documentary, crime, news",
            "votes": 35884,
            "release_date": "2009-09-06",
            "url": "http://www.imdb.com/title/tt1232207/"
        }, {
            "position": 213,
            "const": "tt1039647",
            "created": "Wed Jun 15 02:19:29 2016",
            "modified": "Wed Jun 15 02:19:29 2016",
            "description": "",
            "title": "The Union: The Business Behind Getting High",
            "type": "Documentary",
            "directors": "Brett Harvey",
            "user_rating": 10,
            "imdb_rating": 8.3,
            "runtime": 104,
            "year": 2007,
            "genres": "documentary",
            "votes": 7153,
            "release_date": "2007-06-08",
            "url": "http://www.imdb.com/title/tt1039647/"
        }, {
            "position": 214,
            "const": "tt0918927",
            "created": "Wed Jun 15 14:41:30 2016",
            "modified": "Wed Jun 15 14:41:30 2016",
            "description": "",
            "title": "Doubt",
            "type": "Feature Film",
            "directors": "John Patrick Shanley",
            "user_rating": 7,
            "imdb_rating": 7.5,
            "runtime": 104,
            "year": 2008,
            "genres": "drama, mystery",
            "votes": 101122,
            "release_date": "2008-10-30",
            "url": "http://www.imdb.com/title/tt0918927/"
        }, {
            "position": 215,
            "const": "tt0130827",
            "created": "Thu Jun 16 05:04:36 2016",
            "modified": "Thu Jun 16 05:04:36 2016",
            "description": "",
            "title": "Run Lola Run",
            "type": "Feature Film",
            "directors": "Tom Tykwer",
            "user_rating": 9,
            "imdb_rating": 7.8,
            "runtime": 81,
            "year": 1998,
            "genres": "crime, drama, thriller",
            "votes": 163791,
            "release_date": "1998-08-20",
            "url": "http://www.imdb.com/title/tt0130827/"
        }, {
            "position": 216,
            "const": "tt0379225",
            "created": "Fri Jun 17 15:42:54 2016",
            "modified": "Fri Jun 17 15:42:54 2016",
            "description": "",
            "title": "The Corporation",
            "type": "Documentary",
            "directors": "Mark Achbar, Jennifer Abbott",
            "user_rating": 9,
            "imdb_rating": 8.1,
            "runtime": 145,
            "year": 2003,
            "genres": "documentary, history",
            "votes": 18289,
            "release_date": "2003-09-10",
            "url": "http://www.imdb.com/title/tt0379225/"
        }, {
            "position": 217,
            "const": "tt0427312",
            "created": "Sun Jun 19 04:13:20 2016",
            "modified": "Sun Jun 19 04:13:20 2016",
            "description": "",
            "title": "Grizzly Man",
            "type": "Documentary",
            "directors": "Werner Herzog",
            "user_rating": 8,
            "imdb_rating": 7.8,
            "runtime": 103,
            "year": 2005,
            "genres": "documentary, biography",
            "votes": 42169,
            "release_date": "2005-01-24",
            "url": "http://www.imdb.com/title/tt0427312/"
        }, {
            "position": 218,
            "const": "tt1764234",
            "created": "Mon Jun 20 05:22:11 2016",
            "modified": "Mon Jun 20 05:22:11 2016",
            "description": "",
            "title": "Killing Them Softly",
            "type": "Feature Film",
            "directors": "Andrew Dominik",
            "user_rating": 7,
            "imdb_rating": 6.2,
            "runtime": 97,
            "year": 2012,
            "genres": "crime, thriller",
            "votes": 113517,
            "release_date": "2012-05-22",
            "url": "http://www.imdb.com/title/tt1764234/"
        }, {
            "position": 219,
            "const": "tt0206634",
            "created": "Fri Jun 24 19:31:56 2016",
            "modified": "Fri Jun 24 19:31:56 2016",
            "description": "",
            "title": "Children of Men",
            "type": "Feature Film",
            "directors": "Alfonso Cuarón",
            "user_rating": 9,
            "imdb_rating": 7.9,
            "runtime": 109,
            "year": 2006,
            "genres": "drama, sci_fi, thriller",
            "votes": 370394,
            "release_date": "2006-09-03",
            "url": "http://www.imdb.com/title/tt0206634/"
        }, {
            "position": 220,
            "const": "tt0050083",
            "created": "Sat Jun 25 16:31:55 2016",
            "modified": "Sat Jun 25 16:31:55 2016",
            "description": "",
            "title": "12 Angry Men",
            "type": "Feature Film",
            "directors": "Sidney Lumet",
            "user_rating": 8,
            "imdb_rating": 8.9,
            "runtime": 96,
            "year": 1957,
            "genres": "crime, drama",
            "votes": 464802,
            "release_date": "1957-04-10",
            "url": "http://www.imdb.com/title/tt0050083/"
        }, {
            "position": 221,
            "const": "tt1584016",
            "created": "Sat Jun 25 16:58:25 2016",
            "modified": "Sat Jun 25 16:58:25 2016",
            "description": "",
            "title": "Catfish",
            "type": "Documentary",
            "directors": "Henry Joost, Ariel Schulman",
            "user_rating": 7,
            "imdb_rating": 7.1,
            "runtime": 87,
            "year": 2010,
            "genres": "documentary",
            "votes": 35659,
            "release_date": "2010-01-22",
            "url": "http://www.imdb.com/title/tt1584016/"
        }, {
            "position": 222,
            "const": "tt0424136",
            "created": "Sun Jun 26 06:36:56 2016",
            "modified": "Sun Jun 26 06:36:56 2016",
            "description": "",
            "title": "Hard Candy",
            "type": "Feature Film",
            "directors": "David Slade",
            "user_rating": 7,
            "imdb_rating": 7.1,
            "runtime": 104,
            "year": 2005,
            "genres": "crime, drama, thriller",
            "votes": 133944,
            "release_date": "2005-01",
            "url": "http://www.imdb.com/title/tt0424136/"
        }, {
            "position": 223,
            "const": "tt0427944",
            "created": "Mon Jun 27 20:43:12 2016",
            "modified": "Mon Jun 27 20:43:12 2016",
            "description": "",
            "title": "Thank You for Smoking",
            "type": "Feature Film",
            "directors": "Jason Reitman",
            "user_rating": 7,
            "imdb_rating": 7.6,
            "runtime": 92,
            "year": 2005,
            "genres": "comedy, drama",
            "votes": 194116,
            "release_date": "2005-09-09",
            "url": "http://www.imdb.com/title/tt0427944/"
        }, {
            "position": 224,
            "const": "tt1120985",
            "created": "Tue Jun 28 00:46:48 2016",
            "modified": "Tue Jun 28 00:46:48 2016",
            "description": "",
            "title": "Blue Valentine",
            "type": "Feature Film",
            "directors": "Derek Cianfrance",
            "user_rating": 7,
            "imdb_rating": 7.4,
            "runtime": 112,
            "year": 2010,
            "genres": "drama, romance",
            "votes": 145167,
            "release_date": "2010-01-24",
            "url": "http://www.imdb.com/title/tt1120985/"
        }, {
            "position": 225,
            "const": "tt1139797",
            "created": "Tue Jun 28 05:53:06 2016",
            "modified": "Tue Jun 28 05:53:06 2016",
            "description": "",
            "title": "Let the Right One In",
            "type": "Feature Film",
            "directors": "Tomas Alfredson",
            "user_rating": 8,
            "imdb_rating": 8,
            "runtime": 115,
            "year": 2008,
            "genres": "drama, horror, romance",
            "votes": 176630,
            "release_date": "2008-01-26",
            "url": "http://www.imdb.com/title/tt1139797/"
        }, {
            "position": 226,
            "const": "tt0870111",
            "created": "Wed Jun 29 19:26:31 2016",
            "modified": "Wed Jun 29 19:26:31 2016",
            "description": "",
            "title": "Frost/Nixon",
            "type": "Feature Film",
            "directors": "Ron Howard",
            "user_rating": 8,
            "imdb_rating": 7.7,
            "runtime": 122,
            "year": 2008,
            "genres": "drama",
            "votes": 89715,
            "release_date": "2008-10-15",
            "url": "http://www.imdb.com/title/tt0870111/"
        }, {
            "position": 227,
            "const": "tt0405296",
            "created": "Thu Jun 30 06:09:38 2016",
            "modified": "Thu Jun 30 06:09:38 2016",
            "description": "",
            "title": "A Scanner Darkly",
            "type": "Feature Film",
            "directors": "Richard Linklater",
            "user_rating": 8,
            "imdb_rating": 7.1,
            "runtime": 100,
            "year": 2006,
            "genres": "animation, drama, mystery, sci_fi, thriller",
            "votes": 90893,
            "release_date": "2006-05-25",
            "url": "http://www.imdb.com/title/tt0405296/"
        }, {
            "position": 228,
            "const": "tt0118884",
            "created": "Thu Jun 30 18:58:28 2016",
            "modified": "Thu Jun 30 18:58:28 2016",
            "description": "",
            "title": "Contact",
            "type": "Feature Film",
            "directors": "Robert Zemeckis",
            "user_rating": 7,
            "imdb_rating": 7.4,
            "runtime": 150,
            "year": 1997,
            "genres": "drama, mystery, sci_fi, thriller",
            "votes": 205590,
            "release_date": "1997-07-11",
            "url": "http://www.imdb.com/title/tt0118884/"
        }, {
            "position": 229,
            "const": "tt0404390",
            "created": "Thu Jun 30 22:45:18 2016",
            "modified": "Thu Jun 30 22:45:18 2016",
            "description": "",
            "title": "Running Scared",
            "type": "Feature Film",
            "directors": "Wayne Kramer",
            "user_rating": 7,
            "imdb_rating": 7.4,
            "runtime": 122,
            "year": 2006,
            "genres": "action, crime, drama, thriller",
            "votes": 89393,
            "release_date": "2006-01-06",
            "url": "http://www.imdb.com/title/tt0404390/"
        }, {
            "position": 230,
            "const": "tt0443453",
            "created": "Fri Jul  1 08:30:39 2016",
            "modified": "Fri Jul  1 08:30:39 2016",
            "description": "",
            "title": "Borat: Cultural Learnings of America for Make Benefit Glorious Nation of Kazakhstan",
            "type": "Feature Film",
            "directors": "Larry Charles",
            "user_rating": 8,
            "imdb_rating": 7.3,
            "runtime": 84,
            "year": 2006,
            "genres": "comedy",
            "votes": 301762,
            "release_date": "2006-08-04",
            "url": "http://www.imdb.com/title/tt0443453/"
        }, {
            "position": 231,
            "const": "tt0889583",
            "created": "Fri Jul  1 09:38:04 2016",
            "modified": "Fri Jul  1 09:38:04 2016",
            "description": "",
            "title": "Brüno",
            "type": "Feature Film",
            "directors": "Larry Charles",
            "user_rating": 8,
            "imdb_rating": 5.8,
            "runtime": 81,
            "year": 2009,
            "genres": "comedy",
            "votes": 121552,
            "release_date": "2009-06-25",
            "url": "http://www.imdb.com/title/tt0889583/"
        }, {
            "position": 232,
            "const": "tt0884328",
            "created": "Fri Jul  1 21:30:46 2016",
            "modified": "Fri Jul  1 21:30:46 2016",
            "description": "",
            "title": "The Mist",
            "type": "Feature Film",
            "directors": "Frank Darabont",
            "user_rating": 7,
            "imdb_rating": 7.2,
            "runtime": 126,
            "year": 2007,
            "genres": "horror",
            "votes": 225841,
            "release_date": "2007-11-12",
            "url": "http://www.imdb.com/title/tt0884328/"
        }, {
            "position": 233,
            "const": "tt0071315",
            "created": "Sat Jul  2 06:20:17 2016",
            "modified": "Sat Jul  2 06:20:17 2016",
            "description": "",
            "title": "Chinatown",
            "type": "Feature Film",
            "directors": "Roman Polanski",
            "user_rating": 9,
            "imdb_rating": 8.2,
            "runtime": 130,
            "year": 1974,
            "genres": "drama, mystery, thriller",
            "votes": 222464,
            "release_date": "1974-06-20",
            "url": "http://www.imdb.com/title/tt0071315/"
        }, {
            "position": 234,
            "const": "tt0106677",
            "created": "Sun Jul  3 05:59:26 2016",
            "modified": "Sun Jul  3 05:59:26 2016",
            "description": "",
            "title": "Dazed and Confused",
            "type": "Feature Film",
            "directors": "Richard Linklater",
            "user_rating": 9,
            "imdb_rating": 7.7,
            "runtime": 102,
            "year": 1993,
            "genres": "comedy",
            "votes": 124993,
            "release_date": "1993-08",
            "url": "http://www.imdb.com/title/tt0106677/"
        }, {
            "position": 235,
            "const": "tt3072482",
            "created": "Sun Jul  3 18:05:22 2016",
            "modified": "Sun Jul  3 18:05:22 2016",
            "description": "",
            "title": "Hardcore Henry",
            "type": "Feature Film",
            "directors": "Ilya Naishuller",
            "user_rating": 7,
            "imdb_rating": 6.8,
            "runtime": 96,
            "year": 2015,
            "genres": "action, adventure, sci_fi, thriller",
            "votes": 51053,
            "release_date": "2015-09-12",
            "url": "http://www.imdb.com/title/tt3072482/"
        }, {
            "position": 236,
            "const": "tt1560139",
            "created": "Mon Jul  4 05:15:56 2016",
            "modified": "Mon Jul  4 05:15:56 2016",
            "description": "",
            "title": "Boy",
            "type": "Feature Film",
            "directors": "Taika Waititi",
            "user_rating": 7,
            "imdb_rating": 7.5,
            "runtime": 87,
            "year": 2010,
            "genres": "comedy, drama",
            "votes": 9645,
            "release_date": "2010-01-22",
            "url": "http://www.imdb.com/title/tt1560139/"
        }, {
            "position": 237,
            "const": "tt1172049",
            "created": "Mon Jul  4 06:02:58 2016",
            "modified": "Mon Jul  4 06:02:58 2016",
            "description": "",
            "title": "Demolition",
            "type": "Feature Film",
            "directors": "Jean-Marc Vallée",
            "user_rating": 7,
            "imdb_rating": 7,
            "runtime": 101,
            "year": 2015,
            "genres": "drama",
            "votes": 45787,
            "release_date": "2015-09-10",
            "url": "http://www.imdb.com/title/tt1172049/"
        }, {
            "position": 238,
            "const": "tt2937696",
            "created": "Mon Jul  4 20:52:36 2016",
            "modified": "Mon Jul  4 20:52:36 2016",
            "description": "",
            "title": "Everybody Wants Some!!",
            "type": "Feature Film",
            "directors": "Richard Linklater",
            "user_rating": 7,
            "imdb_rating": 7.1,
            "runtime": 117,
            "year": 2016,
            "genres": "comedy",
            "votes": 26457,
            "release_date": "2016-03-11",
            "url": "http://www.imdb.com/title/tt2937696/"
        }, {
            "position": 239,
            "const": "tt1846487",
            "created": "Fri Jul  8 06:58:29 2016",
            "modified": "Fri Jul  8 06:58:29 2016",
            "description": "",
            "title": "Reality",
            "type": "Feature Film",
            "directors": "Matteo Garrone",
            "user_rating": 8,
            "imdb_rating": 6.7,
            "runtime": 116,
            "year": 2012,
            "genres": "comedy, drama",
            "votes": 3866,
            "release_date": "2012-05-18",
            "url": "http://www.imdb.com/title/tt1846487/"
        }, {
            "position": 240,
            "const": "tt0116629",
            "created": "Sat Jul  9 22:49:05 2016",
            "modified": "Sat Jul  9 22:49:05 2016",
            "description": "",
            "title": "Independence Day",
            "type": "Feature Film",
            "directors": "Roland Emmerich",
            "user_rating": 6,
            "imdb_rating": 6.9,
            "runtime": 145,
            "year": 1996,
            "genres": "action, adventure, sci_fi",
            "votes": 440305,
            "release_date": "1996-06-25",
            "url": "http://www.imdb.com/title/tt0116629/"
        }, {
            "position": 241,
            "const": "tt2358891",
            "created": "Sun Jul 17 19:52:41 2016",
            "modified": "Sun Jul 17 19:52:41 2016",
            "description": "",
            "title": "The Great Beauty",
            "type": "Feature Film",
            "directors": "Paolo Sorrentino",
            "user_rating": 7,
            "imdb_rating": 7.7,
            "runtime": 141,
            "year": 2013,
            "genres": "drama",
            "votes": 58144,
            "release_date": "2013-05-21",
            "url": "http://www.imdb.com/title/tt2358891/"
        }, {
            "position": 242,
            "const": "tt1791528",
            "created": "Wed Jul 20 04:07:42 2016",
            "modified": "Wed Jul 20 04:07:42 2016",
            "description": "",
            "title": "Inherent Vice",
            "type": "Feature Film",
            "directors": "Paul Thomas Anderson",
            "user_rating": 7,
            "imdb_rating": 6.7,
            "runtime": 148,
            "year": 2014,
            "genres": "comedy, crime, drama, mystery, romance",
            "votes": 65311,
            "release_date": "2014-10-04",
            "url": "http://www.imdb.com/title/tt1791528/"
        }, {
            "position": 243,
            "const": "tt0335266",
            "created": "Thu Jul 21 03:38:04 2016",
            "modified": "Thu Jul 21 03:38:04 2016",
            "description": "",
            "title": "Lost in Translation",
            "type": "Feature Film",
            "directors": "Sofia Coppola",
            "user_rating": 7,
            "imdb_rating": 7.8,
            "runtime": 101,
            "year": 2003,
            "genres": "drama",
            "votes": 328222,
            "release_date": "2003-08-29",
            "url": "http://www.imdb.com/title/tt0335266/"
        }, {
            "position": 244,
            "const": "tt3268458",
            "created": "Fri Jul 22 04:23:21 2016",
            "modified": "Fri Jul 22 04:23:21 2016",
            "description": "",
            "title": "The Internet's Own Boy: The Story of Aaron Swartz",
            "type": "Documentary",
            "directors": "Brian Knappenberger",
            "user_rating": 8,
            "imdb_rating": 8.1,
            "runtime": 105,
            "year": 2014,
            "genres": "documentary, biography, crime, news",
            "votes": 11155,
            "release_date": "2014-01-20",
            "url": "http://www.imdb.com/title/tt3268458/"
        }, {
            "position": 245,
            "const": "tt1259521",
            "created": "Sat Aug  6 17:48:03 2016",
            "modified": "Sat Aug  6 17:48:03 2016",
            "description": "",
            "title": "The Cabin in the Woods",
            "type": "Feature Film",
            "directors": "Drew Goddard",
            "user_rating": 7,
            "imdb_rating": 7,
            "runtime": 95,
            "year": 2012,
            "genres": "horror, mystery, thriller",
            "votes": 285866,
            "release_date": "2012-03-09",
            "url": "http://www.imdb.com/title/tt1259521/"
        }, {
            "position": 246,
            "const": "tt3544112",
            "created": "Sun Aug  7 00:58:18 2016",
            "modified": "Sun Aug  7 00:58:18 2016",
            "description": "",
            "title": "Sing Street",
            "type": "Feature Film",
            "directors": "John Carney",
            "user_rating": 7,
            "imdb_rating": 8,
            "runtime": 106,
            "year": 2016,
            "genres": "comedy, drama, music, romance",
            "votes": 26263,
            "release_date": "2016-01-24",
            "url": "http://www.imdb.com/title/tt3544112/"
        }, {
            "position": 247,
            "const": "tt4044364",
            "created": "Sun Aug  7 23:48:28 2016",
            "modified": "Sun Aug  7 23:48:28 2016",
            "description": "",
            "title": "Citizenfour",
            "type": "Documentary",
            "directors": "Laura Poitras",
            "user_rating": 7,
            "imdb_rating": 8.1,
            "runtime": 114,
            "year": 2014,
            "genres": "documentary, biography",
            "votes": 38389,
            "release_date": "2014-10-10",
            "url": "http://www.imdb.com/title/tt4044364/"
        }, {
            "position": 248,
            "const": "tt1935156",
            "created": "Mon Aug  8 14:58:27 2016",
            "modified": "Mon Aug  8 14:58:27 2016",
            "description": "",
            "title": "Jodorowsky's Dune",
            "type": "Documentary",
            "directors": "Frank Pavich",
            "user_rating": 8,
            "imdb_rating": 8.1,
            "runtime": 90,
            "year": 2013,
            "genres": "documentary",
            "votes": 14886,
            "release_date": "2013-05-18",
            "url": "http://www.imdb.com/title/tt1935156/"
        }, {
            "position": 249,
            "const": "tt5278506",
            "created": "Sat Aug 27 19:45:51 2016",
            "modified": "Sat Aug 27 19:45:51 2016",
            "description": "",
            "title": "Tickled",
            "type": "Documentary",
            "directors": "David Farrier, Dylan Reeve",
            "user_rating": 9,
            "imdb_rating": 7.6,
            "runtime": 92,
            "year": 2016,
            "genres": "documentary",
            "votes": 3381,
            "release_date": "2016-01-24",
            "url": "http://www.imdb.com/title/tt5278506/"
        }, {
            "position": 250,
            "const": "tt4062536",
            "created": "Wed Aug 31 02:57:28 2016",
            "modified": "Wed Aug 31 02:57:28 2016",
            "description": "",
            "title": "Green Room",
            "type": "Feature Film",
            "directors": "Jeremy Saulnier",
            "user_rating": 7,
            "imdb_rating": 7.1,
            "runtime": 95,
            "year": 2015,
            "genres": "crime, horror, thriller",
            "votes": 45483,
            "release_date": "2015-05-17",
            "url": "http://www.imdb.com/title/tt4062536/"
        }, {
            "position": 251,
            "const": "tt0780608",
            "created": "Wed Aug 31 02:58:39 2016",
            "modified": "Wed Aug 31 02:58:39 2016",
            "description": "",
            "title": "Smiley Face",
            "type": "Feature Film",
            "directors": "Gregg Araki",
            "user_rating": 7,
            "imdb_rating": 5.8,
            "runtime": 85,
            "year": 2007,
            "genres": "comedy",
            "votes": 14078,
            "release_date": "2007-01-21",
            "url": "http://www.imdb.com/title/tt0780608/"
        }, {
            "position": 252,
            "const": "tt4698684",
            "created": "Wed Aug 31 03:06:53 2016",
            "modified": "Wed Aug 31 03:06:53 2016",
            "description": "",
            "title": "Hunt for the Wilderpeople",
            "type": "Feature Film",
            "directors": "Taika Waititi",
            "user_rating": 7,
            "imdb_rating": 7.9,
            "runtime": 101,
            "year": 2016,
            "genres": "adventure, comedy, drama",
            "votes": 28304,
            "release_date": "2016-01-22",
            "url": "http://www.imdb.com/title/tt4698684/"
        }, {
            "position": 253,
            "const": "tt0056801",
            "created": "Thu Sep  1 20:05:32 2016",
            "modified": "Thu Sep  1 20:05:32 2016",
            "description": "",
            "title": "8½",
            "type": "Feature Film",
            "directors": "Federico Fellini",
            "user_rating": 8,
            "imdb_rating": 8.1,
            "runtime": 138,
            "year": 1963,
            "genres": "drama, fantasy",
            "votes": 80799,
            "release_date": "1963-02-13",
            "url": "http://www.imdb.com/title/tt0056801/"
        }, {
            "position": 254,
            "const": "tt0040522",
            "created": "Fri Sep  2 16:03:48 2016",
            "modified": "Fri Sep  2 16:03:48 2016",
            "description": "",
            "title": "Bicycle Thieves",
            "type": "Feature Film",
            "directors": "Vittorio De Sica",
            "user_rating": 7,
            "imdb_rating": 8.3,
            "runtime": 89,
            "year": 1948,
            "genres": "drama",
            "votes": 97963,
            "release_date": "1948-11-24",
            "url": "http://www.imdb.com/title/tt0040522/"
        }, {
            "position": 255,
            "const": "tt1974419",
            "created": "Thu Sep  8 01:26:14 2016",
            "modified": "Thu Sep  8 01:26:14 2016",
            "description": "",
            "title": "The Neon Demon",
            "type": "Feature Film",
            "directors": "Nicolas Winding Refn",
            "user_rating": 8,
            "imdb_rating": 6.3,
            "runtime": 118,
            "year": 2016,
            "genres": "horror, thriller",
            "votes": 34789,
            "release_date": "2016-05-20",
            "url": "http://www.imdb.com/title/tt1974419/"
        }, {
            "position": 256,
            "const": "tt0370986",
            "created": "Fri Sep  9 20:31:14 2016",
            "modified": "Fri Sep  9 20:31:14 2016",
            "description": "",
            "title": "Mysterious Skin",
            "type": "Feature Film",
            "directors": "Gregg Araki",
            "user_rating": 9,
            "imdb_rating": 7.7,
            "runtime": 105,
            "year": 2004,
            "genres": "drama",
            "votes": 57733,
            "release_date": "2004-09-03",
            "url": "http://www.imdb.com/title/tt0370986/"
        }, {
            "position": 257,
            "const": "tt0110057",
            "created": "Sat Sep 10 02:58:46 2016",
            "modified": "Sat Sep 10 02:58:46 2016",
            "description": "",
            "title": "Hoop Dreams",
            "type": "Documentary",
            "directors": "Steve James",
            "user_rating": 8,
            "imdb_rating": 8.3,
            "runtime": 170,
            "year": 1994,
            "genres": "documentary, drama, sport",
            "votes": 19514,
            "release_date": "1994-01",
            "url": "http://www.imdb.com/title/tt0110057/"
        }, {
            "position": 258,
            "const": "tt1164999",
            "created": "Mon Sep 12 14:42:28 2016",
            "modified": "Mon Sep 12 14:42:28 2016",
            "description": "",
            "title": "Biutiful",
            "type": "Feature Film",
            "directors": "Alejandro González Iñárritu",
            "user_rating": 9,
            "imdb_rating": 7.5,
            "runtime": 148,
            "year": 2010,
            "genres": "drama, romance",
            "votes": 70587,
            "release_date": "2010-05-17",
            "url": "http://www.imdb.com/title/tt1164999/"
        }, {
            "position": 259,
            "const": "tt0756683",
            "created": "Tue Sep 13 03:56:43 2016",
            "modified": "Tue Sep 13 03:56:43 2016",
            "description": "",
            "title": "The Man from Earth",
            "type": "Feature Film",
            "directors": "Richard Schenkman",
            "user_rating": 7,
            "imdb_rating": 8,
            "runtime": 87,
            "year": 2007,
            "genres": "drama, fantasy, sci_fi",
            "votes": 134144,
            "release_date": "2007-06-10",
            "url": "http://www.imdb.com/title/tt0756683/"
        }, {
            "position": 260,
            "const": "tt2039345",
            "created": "Sat Sep 17 20:43:36 2016",
            "modified": "Sat Sep 17 20:43:36 2016",
            "description": "",
            "title": "Grand Piano",
            "type": "Feature Film",
            "directors": "Eugenio Mira",
            "user_rating": 6,
            "imdb_rating": 5.9,
            "runtime": 90,
            "year": 2013,
            "genres": "music, mystery, thriller",
            "votes": 13386,
            "release_date": "2013-09-20",
            "url": "http://www.imdb.com/title/tt2039345/"
        }, {
            "position": 261,
            "const": "tt0113247",
            "created": "Sun Sep 18 14:50:28 2016",
            "modified": "Sun Sep 18 14:50:28 2016",
            "description": "",
            "title": "La Haine",
            "type": "Feature Film",
            "directors": "Mathieu Kassovitz",
            "user_rating": 8,
            "imdb_rating": 8.1,
            "runtime": 98,
            "year": 1995,
            "genres": "crime, drama",
            "votes": 107051,
            "release_date": "1995-05-27",
            "url": "http://www.imdb.com/title/tt0113247/"
        }, {
            "position": 262,
            "const": "tt1149362",
            "created": "Mon Sep 19 05:24:55 2016",
            "modified": "Mon Sep 19 05:24:55 2016",
            "description": "",
            "title": "The White Ribbon",
            "type": "Feature Film",
            "directors": "Michael Haneke",
            "user_rating": 10,
            "imdb_rating": 7.8,
            "runtime": 144,
            "year": 2009,
            "genres": "drama, mystery",
            "votes": 54345,
            "release_date": "2009-05-21",
            "url": "http://www.imdb.com/title/tt1149362/"
        }, {
            "position": 263,
            "const": "tt2059255",
            "created": "Tue Sep 20 14:55:42 2016",
            "modified": "Tue Sep 20 14:55:42 2016",
            "description": "",
            "title": "No",
            "type": "Feature Film",
            "directors": "Pablo Larraín",
            "user_rating": 7,
            "imdb_rating": 7.4,
            "runtime": 118,
            "year": 2012,
            "genres": "drama",
            "votes": 18154,
            "release_date": "2012-05-18",
            "url": "http://www.imdb.com/title/tt2059255/"
        }, {
            "position": 264,
            "const": "tt1602620",
            "created": "Wed Sep 21 05:41:03 2016",
            "modified": "Wed Sep 21 05:41:03 2016",
            "description": "",
            "title": "Amour",
            "type": "Feature Film",
            "directors": "Michael Haneke",
            "user_rating": 10,
            "imdb_rating": 7.9,
            "runtime": 127,
            "year": 2012,
            "genres": "drama, romance",
            "votes": 72198,
            "release_date": "2012-05-20",
            "url": "http://www.imdb.com/title/tt1602620/"
        }, {
            "position": 265,
            "const": "tt0435623",
            "created": "Sat Sep 24 06:36:25 2016",
            "modified": "Sat Sep 24 06:36:25 2016",
            "description": "",
            "title": "Conversations with Other Women",
            "type": "Feature Film",
            "directors": "Hans Canosa",
            "user_rating": 7,
            "imdb_rating": 7.1,
            "runtime": 84,
            "year": 2005,
            "genres": "comedy, drama, romance",
            "votes": 10313,
            "release_date": "2005-09-02",
            "url": "http://www.imdb.com/title/tt0435623/"
        }, {
            "position": 266,
            "const": "tt0838221",
            "created": "Sat Sep 24 21:09:35 2016",
            "modified": "Sat Sep 24 21:09:35 2016",
            "description": "",
            "title": "The Darjeeling Limited",
            "type": "Feature Film",
            "directors": "Wes Anderson",
            "user_rating": 8,
            "imdb_rating": 7.2,
            "runtime": 91,
            "year": 2007,
            "genres": "adventure, comedy, drama",
            "votes": 141575,
            "release_date": "2007-08",
            "url": "http://www.imdb.com/title/tt0838221/"
        }, {
            "position": 267,
            "const": "tt0399295",
            "created": "Mon Sep 26 03:18:29 2016",
            "modified": "Mon Sep 26 03:18:29 2016",
            "description": "",
            "title": "Lord of War",
            "type": "Feature Film",
            "directors": "Andrew Niccol",
            "user_rating": 7,
            "imdb_rating": 7.6,
            "runtime": 122,
            "year": 2005,
            "genres": "crime, drama, thriller",
            "votes": 252429,
            "release_date": "2005-09-16",
            "url": "http://www.imdb.com/title/tt0399295/"
        }, {
            "position": 268,
            "const": "tt1827512",
            "created": "Mon Sep 26 20:12:45 2016",
            "modified": "Mon Sep 26 20:12:45 2016",
            "description": "",
            "title": "The Kid with a Bike",
            "type": "Feature Film",
            "directors": "Jean-Pierre Dardenne, Luc Dardenne",
            "user_rating": 9,
            "imdb_rating": 7.4,
            "runtime": 84,
            "year": 2011,
            "genres": "drama",
            "votes": 21662,
            "release_date": "2011-05-15",
            "url": "http://www.imdb.com/title/tt1827512/"
        }, {
            "position": 269,
            "const": "tt4034354",
            "created": "Tue Sep 27 04:06:44 2016",
            "modified": "Tue Sep 27 04:06:44 2016",
            "description": "",
            "title": "Swiss Army Man",
            "type": "Feature Film",
            "directors": "Dan Kwan, Daniel Scheinert",
            "user_rating": 6,
            "imdb_rating": 7.1,
            "runtime": 97,
            "year": 2016,
            "genres": "adventure, comedy, drama, fantasy",
            "votes": 38811,
            "release_date": "2016-01-22",
            "url": "http://www.imdb.com/title/tt4034354/"
        }, {
            "position": 270,
            "const": "tt3799694",
            "created": "Tue Sep 27 20:27:39 2016",
            "modified": "Tue Sep 27 20:27:39 2016",
            "description": "",
            "title": "The Nice Guys",
            "type": "Feature Film",
            "directors": "Shane Black",
            "user_rating": 6,
            "imdb_rating": 7.4,
            "runtime": 116,
            "year": 2016,
            "genres": "action, comedy, crime, mystery, thriller",
            "votes": 126935,
            "release_date": "2016-05-15",
            "url": "http://www.imdb.com/title/tt3799694/"
        }, {
            "position": 271,
            "const": "tt3844362",
            "created": "Tue Sep 27 21:58:43 2016",
            "modified": "Tue Sep 27 21:58:43 2016",
            "description": "",
            "title": "The Overnight",
            "type": "Feature Film",
            "directors": "Patrick Brice",
            "user_rating": 7,
            "imdb_rating": 6.2,
            "runtime": 79,
            "year": 2015,
            "genres": "comedy, mystery",
            "votes": 11078,
            "release_date": "2015-01-23",
            "url": "http://www.imdb.com/title/tt3844362/"
        }, {
            "position": 272,
            "const": "tt0303361",
            "created": "Wed Sep 28 05:49:48 2016",
            "modified": "Wed Sep 28 05:49:48 2016",
            "description": "",
            "title": "May",
            "type": "Feature Film",
            "directors": "Lucky McKee",
            "user_rating": 8,
            "imdb_rating": 6.7,
            "runtime": 93,
            "year": 2002,
            "genres": "drama, horror",
            "votes": 27287,
            "release_date": "2002-01-13",
            "url": "http://www.imdb.com/title/tt0303361/"
        }, {
            "position": 273,
            "const": "tt3312830",
            "created": "Wed Sep 28 23:37:20 2016",
            "modified": "Wed Sep 28 23:37:20 2016",
            "description": "",
            "title": "Youth",
            "type": "Feature Film",
            "directors": "Paolo Sorrentino",
            "user_rating": 8,
            "imdb_rating": 7.4,
            "runtime": 124,
            "year": 2015,
            "genres": "comedy, drama, music, romance",
            "votes": 47071,
            "release_date": "2015-05-20",
            "url": "http://www.imdb.com/title/tt3312830/"
        }, {
            "position": 274,
            "const": "tt0088258",
            "created": "Thu Sep 29 06:58:25 2016",
            "modified": "Thu Sep 29 06:58:25 2016",
            "description": "",
            "title": "This Is Spinal Tap",
            "type": "Feature Film",
            "directors": "Rob Reiner",
            "user_rating": 7,
            "imdb_rating": 8,
            "runtime": 82,
            "year": 1984,
            "genres": "comedy, music",
            "votes": 107069,
            "release_date": "1984-03-02",
            "url": "http://www.imdb.com/title/tt0088258/"
        }, {
            "position": 275,
            "const": "tt0110008",
            "created": "Fri Sep 30 02:53:34 2016",
            "modified": "Fri Sep 30 02:53:34 2016",
            "description": "",
            "title": "Pom Poko",
            "type": "Feature Film",
            "directors": "Isao Takahata",
            "user_rating": 6,
            "imdb_rating": 7.4,
            "runtime": 119,
            "year": 1994,
            "genres": "animation, comedy, drama, family, fantasy",
            "votes": 15138,
            "release_date": "1994-07-16",
            "url": "http://www.imdb.com/title/tt0110008/"
        }, {
            "position": 276,
            "const": "tt0097814",
            "created": "Fri Sep 30 02:54:53 2016",
            "modified": "Fri Sep 30 02:54:53 2016",
            "description": "",
            "title": "Kiki's Delivery Service",
            "type": "Feature Film",
            "directors": "Hayao Miyazaki",
            "user_rating": 7,
            "imdb_rating": 7.9,
            "runtime": 103,
            "year": 1989,
            "genres": "animation, adventure, drama, family, fantasy",
            "votes": 78720,
            "release_date": "1989-07-29",
            "url": "http://www.imdb.com/title/tt0097814/"
        }, {
            "position": 277,
            "const": "tt0086541",
            "created": "Fri Sep 30 06:56:44 2016",
            "modified": "Fri Sep 30 06:56:44 2016",
            "description": "",
            "title": "Videodrome",
            "type": "Feature Film",
            "directors": "David Cronenberg",
            "user_rating": 7,
            "imdb_rating": 7.3,
            "runtime": 87,
            "year": 1983,
            "genres": "horror, mystery, sci_fi, thriller",
            "votes": 62395,
            "release_date": "1983-02-04",
            "url": "http://www.imdb.com/title/tt0086541/"
        }, {
            "position": 278,
            "const": "tt3654964",
            "created": "Fri Sep 30 21:03:46 2016",
            "modified": "Fri Sep 30 21:03:46 2016",
            "description": "",
            "title": "Art and Craft",
            "type": "Documentary",
            "directors": "Sam Cullman, Jennifer Grausman",
            "user_rating": 7,
            "imdb_rating": 7.1,
            "runtime": 89,
            "year": 2014,
            "genres": "documentary",
            "votes": 865,
            "release_date": "2014-04-17",
            "url": "http://www.imdb.com/title/tt3654964/"
        }, {
            "position": 279,
            "const": "tt0095327",
            "created": "Sat Oct  1 01:59:52 2016",
            "modified": "Sat Oct  1 01:59:52 2016",
            "description": "",
            "title": "Grave of the Fireflies",
            "type": "Feature Film",
            "directors": "Isao Takahata",
            "user_rating": 6,
            "imdb_rating": 8.5,
            "runtime": 89,
            "year": 1988,
            "genres": "animation, drama, war",
            "votes": 144791,
            "release_date": "1988-04-16",
            "url": "http://www.imdb.com/title/tt0095327/"
        }, {
            "position": 280,
            "const": "tt0087800",
            "created": "Tue Oct  4 06:26:33 2016",
            "modified": "Tue Oct  4 06:26:33 2016",
            "description": "",
            "title": "A Nightmare on Elm Street",
            "type": "Feature Film",
            "directors": "Wes Craven",
            "user_rating": 6,
            "imdb_rating": 7.5,
            "runtime": 91,
            "year": 1984,
            "genres": "horror",
            "votes": 154370,
            "release_date": "1984-10",
            "url": "http://www.imdb.com/title/tt0087800/"
        }, {
            "position": 281,
            "const": "tt0780607",
            "created": "Thu Oct  6 05:22:17 2016",
            "modified": "Thu Oct  6 05:22:17 2016",
            "description": "",
            "title": "The Signal",
            "type": "Feature Film",
            "directors": "David Bruckner, Dan Bush",
            "user_rating": 7,
            "imdb_rating": 6.1,
            "runtime": 103,
            "year": 2007,
            "genres": "horror, sci_fi, thriller",
            "votes": 18532,
            "release_date": "2007-01-22",
            "url": "http://www.imdb.com/title/tt0780607/"
        }, {
            "position": 282,
            "const": "tt0066921",
            "created": "Thu Oct  6 20:45:29 2016",
            "modified": "Thu Oct  6 20:45:29 2016",
            "description": "",
            "title": "A Clockwork Orange",
            "type": "Feature Film",
            "directors": "Stanley Kubrick",
            "user_rating": 10,
            "imdb_rating": 8.3,
            "runtime": 136,
            "year": 1971,
            "genres": "crime, drama, sci_fi",
            "votes": 574811,
            "release_date": "1971-12-19",
            "url": "http://www.imdb.com/title/tt0066921/"
        }, {
            "position": 283,
            "const": "tt0289043",
            "created": "Fri Oct  7 17:34:03 2016",
            "modified": "Fri Oct  7 17:34:03 2016",
            "description": "",
            "title": "28 Days Later...",
            "type": "Feature Film",
            "directors": "Danny Boyle",
            "user_rating": 7,
            "imdb_rating": 7.6,
            "runtime": 113,
            "year": 2002,
            "genres": "drama, horror, sci_fi, thriller",
            "votes": 304339,
            "release_date": "2002-11-01",
            "url": "http://www.imdb.com/title/tt0289043/"
        }, {
            "position": 284,
            "const": "tt0449059",
            "created": "Sun Oct  9 04:06:25 2016",
            "modified": "Sun Oct  9 04:06:25 2016",
            "description": "",
            "title": "Little Miss Sunshine",
            "type": "Feature Film",
            "directors": "Jonathan Dayton, Valerie Faris",
            "user_rating": 7,
            "imdb_rating": 7.8,
            "runtime": 101,
            "year": 2006,
            "genres": "comedy, drama",
            "votes": 363328,
            "release_date": "2006-01-20",
            "url": "http://www.imdb.com/title/tt0449059/"
        }, {
            "position": 285,
            "const": "tt1127180",
            "created": "Fri Oct 14 19:59:39 2016",
            "modified": "Fri Oct 14 19:59:39 2016",
            "description": "",
            "title": "Drag Me to Hell",
            "type": "Feature Film",
            "directors": "Sam Raimi",
            "user_rating": 8,
            "imdb_rating": 6.6,
            "runtime": 99,
            "year": 2009,
            "genres": "comedy, horror, thriller",
            "votes": 161403,
            "release_date": "2009-03-15",
            "url": "http://www.imdb.com/title/tt1127180/"
        }, {
            "position": 286,
            "const": "tt3472226",
            "created": "Mon Oct 17 00:59:20 2016",
            "modified": "Mon Oct 17 00:59:20 2016",
            "description": "",
            "title": "Kung Fury",
            "type": "Short Film",
            "directors": "David Sandberg",
            "user_rating": 7,
            "imdb_rating": 8.1,
            "runtime": 31,
            "year": 2015,
            "genres": "action, comedy, fantasy, sci_fi",
            "votes": 40693,
            "release_date": "2015-05-22",
            "url": "http://www.imdb.com/title/tt3472226/"
        }, {
            "position": 287,
            "const": "tt0020530",
            "created": "Tue Oct 18 02:32:00 2016",
            "modified": "Tue Oct 18 02:32:00 2016",
            "description": "",
            "title": "Un Chien Andalou",
            "type": "Short Film",
            "directors": "Louis Bunuel",
            "user_rating": 7,
            "imdb_rating": 7.8,
            "runtime": 16,
            "year": 1929,
            "genres": "fantasy, horror",
            "votes": 35021,
            "release_date": "1929-06-06",
            "url": "http://www.imdb.com/title/tt0020530/"
        }, {
            "position": 288,
            "const": "tt0409591",
            "created": "Mon Oct 24 01:47:48 2016",
            "modified": "Mon Oct 24 01:47:48 2016",
            "description": "",
            "title": "Naruto",
            "type": "TV Series",
            "directors": "",
            "user_rating": 6,
            "imdb_rating": 8.2,
            "runtime": 24,
            "year": 2002,
            "genres": "animation, action, adventure, comedy, fantasy, thriller",
            "votes": 42782,
            "release_date": "2002-10-03",
            "url": "http://www.imdb.com/title/tt0409591/"
        }, {
            "position": 289,
            "const": "tt0988824",
            "created": "Mon Oct 24 01:48:10 2016",
            "modified": "Mon Oct 24 01:48:10 2016",
            "description": "",
            "title": "Naruto: Shippûden",
            "type": "TV Series",
            "directors": "",
            "user_rating": null,
            "imdb_rating": 8.5,
            "runtime": 24,
            "year": 2007,
            "genres": "animation, action, adventure, drama, fantasy",
            "votes": 46878,
            "release_date": "2007-02-15",
            "url": "http://www.imdb.com/title/tt0988824/"
        }, {
            "position": 290,
            "const": "tt0877057",
            "created": "Wed Oct 26 04:48:31 2016",
            "modified": "Wed Oct 26 04:48:31 2016",
            "description": "",
            "title": "Death Note",
            "type": "TV Series",
            "directors": "",
            "user_rating": 9,
            "imdb_rating": 9,
            "runtime": 24,
            "year": 2006,
            "genres": "animation, crime, drama, fantasy, horror, mystery, thriller",
            "votes": 119463,
            "release_date": "2006-10-03",
            "url": "http://www.imdb.com/title/tt0877057/"
        }, {
            "position": 291,
            "const": "tt2560140",
            "created": "Wed Oct 26 04:49:12 2016",
            "modified": "Wed Oct 26 04:49:12 2016",
            "description": "",
            "title": "Attack on Titan",
            "type": "TV Series",
            "directors": "",
            "user_rating": 7,
            "imdb_rating": 8.8,
            "runtime": 24,
            "year": 2013,
            "genres": "animation, action, adventure, drama, fantasy, horror",
            "votes": 69751,
            "release_date": "2013-04-07",
            "url": "http://www.imdb.com/title/tt2560140/"
        }, {
            "position": 292,
            "const": "tt0213338",
            "created": "Wed Oct 26 04:49:39 2016",
            "modified": "Wed Oct 26 04:49:39 2016",
            "description": "",
            "title": "Cowboy Bebop",
            "type": "TV Series",
            "directors": "Kunihiro Mori, Ikurô Satô",
            "user_rating": 10,
            "imdb_rating": 9,
            "runtime": 24,
            "year": 1998,
            "genres": "animation, action, adventure, drama, sci_fi, thriller",
            "votes": 54689,
            "release_date": "1998-04-03",
            "url": "http://www.imdb.com/title/tt0213338/"
        }, {
            "position": 293,
            "const": "tt2543164",
            "created": "Fri Nov 11 03:14:06 2016",
            "modified": "Fri Nov 11 03:14:06 2016",
            "description": "",
            "title": "Arrival",
            "type": "Feature Film",
            "directors": "Denis Villeneuve",
            "user_rating": 8,
            "imdb_rating": 8.4,
            "runtime": 116,
            "year": 2016,
            "genres": "drama, mystery, sci_fi, thriller",
            "votes": 84829,
            "release_date": "2016-09-01",
            "url": "http://www.imdb.com/title/tt2543164/"
        }, {
            "position": 294,
            "const": "tt0120669",
            "created": "Fri Nov 25 04:18:10 2016",
            "modified": "Fri Nov 25 04:18:10 2016",
            "description": "",
            "title": "Fear and Loathing in Las Vegas",
            "type": "Feature Film",
            "directors": "Terry Gilliam",
            "user_rating": 10,
            "imdb_rating": 7.7,
            "runtime": 118,
            "year": 1998,
            "genres": "adventure, comedy, drama",
            "votes": 217126,
            "release_date": "1998-05-15",
            "url": "http://www.imdb.com/title/tt0120669/"
        }, {
            "position": 295,
            "const": "tt0073195",
            "created": "Fri Dec  9 20:05:48 2016",
            "modified": "Fri Dec  9 20:05:48 2016",
            "description": "",
            "title": "Jaws",
            "type": "Feature Film",
            "directors": "Steven Spielberg",
            "user_rating": 7,
            "imdb_rating": 8,
            "runtime": 124,
            "year": 1975,
            "genres": "adventure, drama, thriller",
            "votes": 424415,
            "release_date": "1975-06-20",
            "url": "http://www.imdb.com/title/tt0073195/"
        }, {
            "position": 296,
            "const": "tt4550098",
            "created": "Mon Dec 12 00:41:15 2016",
            "modified": "Mon Dec 12 00:41:15 2016",
            "description": "",
            "title": "Nocturnal Animals",
            "type": "Feature Film",
            "directors": "Tom Ford",
            "user_rating": 9,
            "imdb_rating": 8,
            "runtime": 116,
            "year": 2016,
            "genres": "drama, thriller",
            "votes": 15381,
            "release_date": "2016-09-02",
            "url": "http://www.imdb.com/title/tt4550098/"
        }];
    exports.default = DATABASE;
});
define("example/ghp/js/delegates/menus/genres", ["require", "exports", "example/ghp/js/var/movies", "example/ghp/js/services/i18n"], function (require, exports, movies_1, i18n_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function clean(s) {
        return s.replace(/(^\s+|\s+$)/g, "");
    }
    var Delegate = /** @class */ (function () {
        function Delegate(filters) {
            this.filters = filters;
        }
        Delegate.prototype.text = function () {
            var latest = this.filters.latest;
            return latest.genre ? i18n_3.default(latest.genre) : i18n_3.default("select_genre");
        };
        Delegate.prototype.select = function (_a, callback) {
            var genre = _a.genre;
            var filters = this.filters;
            if (genre === i18n_3.default("all"))
                genre = null;
            filters.dispatch({ field: "genre", value: genre });
            callback();
        };
        Delegate.prototype.translate = function (_a) {
            var genre = _a.genre;
            return i18n_3.default(genre);
        };
        Delegate.prototype.options = function (callback) {
            var options = [];
            var found = {};
            for (var i = 0, c = movies_1.default.length; i < c; i++) {
                var list = movies_1.default[i].genres;
                var genres = list.split(",");
                for (var j = 0; j < genres.length; j++) {
                    var genre = clean(genres[j]);
                    if (found[genre] !== undefined)
                        continue;
                    found[genre] = true;
                    options.push({ genre: genre });
                }
            }
            options.sort(function (_a, _b) {
                var a = _a.genre;
                var b = _b.genre;
                if (a < b)
                    return -1;
                if (b > a)
                    return 1;
                return 0;
            });
            options.unshift({ genre: i18n_3.default("all") });
            callback(options);
        };
        return Delegate;
    }());
    exports.default = Delegate;
});
define("example/ghp/js/services/movies", ["require", "exports", "example/ghp/js/services/defer", "example/ghp/js/var/movies"], function (require, exports, defer_1, movies_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Movies service
    //
    // Since the movie data for this example is hard-coded in a json file, this point of this service is to mimic the
    // functionality of a server-side api for asynchronous data source demonstration purposes. Normally in a "real" 
    // application, the delegates would simply make xhr calls to a server-side api with the sorting/pagination information.
    var MAX_NETWORK_TIME = 400;
    var MIN_NETWORK_TIME = 30;
    function extract(movie, field) {
        return movie[field];
    }
    function throttle() {
        return Math.floor(Math.random() * MAX_NETWORK_TIME) + MIN_NETWORK_TIME;
    }
    function find(filters, max, current_page, orderby) {
        var _a = defer_1.default.defer(), promise = _a.promise, resolve = _a.resolve, reject = _a.reject;
        var results = [];
        var direction = orderby && orderby.charAt(0) === "-";
        var sort_field = direction ? orderby.substr(1) : orderby;
        for (var i = 0, c = movies_2.default.length; i < c; i++) {
            var movie = movies_2.default[i];
            if (filters.test(movie) === false)
                continue;
            results.push(movie);
        }
        function applySort(movie_a, movie_b) {
            var va = extract(movie_a, sort_field);
            var vb = extract(movie_b, sort_field);
            var result = 0;
            if (va < vb)
                result = -1;
            if (va > vb)
                result = 1;
            return direction ? result : (result * -1);
        }
        results.sort(applySort);
        var total = results.length;
        var start = max * current_page;
        var end = start + max;
        results = results.slice(start, end);
        function finish() {
            resolve({ results: results, total: total });
        }
        setTimeout(finish, throttle());
        return promise;
    }
    exports.default = { find: find };
});
define("example/ghp/js/delegates/tables/movies", ["require", "exports", "example/ghp/js/services/i18n", "example/ghp/js/services/movies"], function (require, exports, i18n_4, movies_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var COLUMNS = [{
            rel: "const",
            name: i18n_4.default("id")
        }, {
            rel: "title",
            name: i18n_4.default("title")
        }, {
            rel: "year",
            name: i18n_4.default("release_date")
        }, {
            rel: "runtime",
            name: i18n_4.default("runtime")
        }, {
            rel: "directors",
            name: i18n_4.default("directors")
        }, {
            rel: "genres",
            name: i18n_4.default("genres")
        }, {
            rel: "imdb_rating",
            name: i18n_4.default("rating")
        }];
    var TableDelegate = /** @class */ (function () {
        function TableDelegate(filters) {
            this.filters = filters;
        }
        TableDelegate.prototype.columns = function () {
            return COLUMNS.slice(0);
        };
        TableDelegate.prototype.rows = function (pagination, sorting, callback) {
            var filters = this.filters;
            var max = pagination.size, page = pagination.current;
            var orderby = "yaer";
            if (sorting && sorting.rel) {
                orderby = sorting.direction ? sorting.rel : "-" + sorting.rel;
            }
            function success(_a) {
                var results = _a.results, total = _a.total;
                var rows = [];
                if (total === 0) {
                    rows = [{ empty: true }];
                    return callback({ rows: rows });
                }
                for (var i = 0, c = results.length; i < c; i++) {
                    rows.push({ movie: results[i] });
                }
                callback({ rows: rows, total: total });
            }
            function failed(error) {
                console.error(error);
                callback([{ error: error }], 0);
            }
            movies_3.default.find(filters, max, page, orderby).then(success).catch(failed);
        };
        return TableDelegate;
    }());
    exports.default = TableDelegate;
});
define("example/ghp/js/services/uuid", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var pool = 0;
    function generate() {
        return btoa("-" + ++pool);
    }
    exports.default = generate;
});
define("example/ghp/js/services/filters", ["require", "exports", "example/ghp/js/services/uuid"], function (require, exports, uuid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function lower(s) {
        return s.toLowerCase();
    }
    function clean(s) {
        return s.replace(/(^\s+|\s+$)/g, "");
    }
    var Filters = /** @class */ (function () {
        function Filters() {
            this.filters = [];
            this.listeners = [];
        }
        Filters.prototype.subscribe = function (update) {
            var id = uuid_1.default();
            this.listeners.push({ id: id, update: update });
            return id;
        };
        Filters.prototype.unsubscribe = function (target) {
            var listeners = this.listeners;
            this.listeners = listeners.filter(function (_a) {
                var id = _a.id;
                return id !== target;
            });
        };
        Object.defineProperty(Filters.prototype, "latest", {
            get: function () {
                var filters = this.filters;
                var result = {};
                for (var i = 0, c = filters.length; i < c; i++) {
                    var _a = filters[i], field = _a.field, value = _a.value;
                    result[field] = value;
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        Filters.prototype.dispatch = function () {
            var payloads = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                payloads[_i] = arguments[_i];
            }
            var _a = this, filters = _a.filters, listeners = _a.listeners;
            // Get a list of the fields in the payloads provided.
            var fields = payloads.map(function (_a) {
                var field = _a.field;
                return field;
            });
            // Filter the existing filters so that only the fields not in our payload are present.
            var unique = filters.filter(function (_a) {
                var field = _a.field;
                return fields.indexOf(field) === -1;
            });
            // Update our fields array with the unique filters and our payload.
            this.filters = unique.concat(payloads);
            for (var i = 0, c = listeners.length; i < c; i++) {
                var _b = listeners[i], update = _b.update, id = _b.id;
                update();
            }
        };
        return Filters;
    }());
    exports.default = Filters;
});
define("example/ghp/js/services/movie_filters", ["require", "exports", "example/ghp/js/services/filters"], function (require, exports, filters_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function lower(s) {
        return s.toLowerCase();
    }
    function clean(s) {
        return s.replace(/(^\s+|\s+$)/g, "");
    }
    var MovieFilters = /** @class */ (function (_super) {
        __extends(MovieFilters, _super);
        function MovieFilters() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MovieFilters.prototype.test = function (movie) {
            var _a = this, filters = _a.filters, latest = _a.latest;
            if (filters.length === 0) {
                return true;
            }
            if (latest.title) {
                return lower(movie.title).indexOf(lower(latest.title)) >= 0;
            }
            var genres = movie.genres.split(",").map(clean);
            return latest.genre ? genres.indexOf(latest.genre) !== -1 : true;
        };
        return MovieFilters;
    }(filters_1.default));
    exports.default = MovieFilters;
});
define("example/ghp/js/routes/movies", ["require", "exports", "example/ghp/js/services/defer", "example/ghp/js/delegates/menus/genres", "example/ghp/js/delegates/tables/movies", "example/ghp/js/services/movie_filters"], function (require, exports, defer_2, genres_1, movies_4, movie_filters_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var path = "movies";
    var view = "example/ghp/js/views/movies";
    // Index route
    //
    // Here we are demonstrating the initialization of application state inside a route's resolution phase. The goal here 
    // is to prepare all of the necessary state/classes/instances that will be used in the view.
    function resolve() {
        var filters = new movie_filters_1.default();
        var table_delegate = new movies_4.default(filters);
        var genre_delegate = new genres_1.default(filters);
        return defer_2.default.resolve({ table_delegate: table_delegate, genre_delegate: genre_delegate, filters: filters });
    }
    exports.default = { path: path, view: view, resolve: resolve };
});
define("example/ghp/js/routes/about", ["require", "exports", "example/ghp/js/services/defer", "config/environment"], function (require, exports, defer_3, env) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var path = "about";
    var view = "example/ghp/js/views/about";
    function resolve() {
        var _a = env.contentful || {}, space_id = _a.space_id, access_token = _a.access_token, api_base_url = _a.api_base_url;
        if (!space_id || !access_token) {
            return defer_3.default.reject(new Error("invalid contentful configuration"));
        }
        try {
            access_token = atob(access_token);
        }
        catch (e) {
            return defer_3.default.reject(new Error("invalid contentful access token"));
        }
        function loaded(xhr, data) {
            var json = JSON.parse(data);
            var content = json.items[0];
            return defer_3.default.resolve({ content: content });
        }
        function failed(e) {
            console.error(e);
            return defer_3.default.reject(e);
        }
        var content_type = 'aboutPage';
        var request = qwest.get(api_base_url + "/spaces/" + space_id + "/entries", { content_type: content_type, access_token: access_token });
        return request.then(loaded).catch(failed);
    }
    exports.default = { path: path, view: view, resolve: resolve };
});
define("example/ghp/js/services/zomato", ["require", "exports", "example/ghp/js/services/defer"], function (require, exports, defer_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ACCESS_TOKEN_HEADER = "user-key";
    function send(url, params) {
        var access_token = this.credentials.access_token;
        function preflight(xhr) {
            xhr.setRequestHeader(ACCESS_TOKEN_HEADER, atob(access_token));
        }
        function status(xhr, result) {
            var code = xhr.status;
            return code !== 200 ? defer_4.default.reject(result) : defer_4.default.resolve(result);
        }
        return qwest.get(url, params, { cache: true }, preflight).then(status);
    }
    var Client = /** @class */ (function () {
        function Client(credentials) {
            this.credentials = credentials;
        }
        Client.prototype.cuisines = function (city_id, query, extra) {
            if (extra === void 0) { extra = {}; }
            var api_base_url = this.credentials.api_base_url;
            var url = api_base_url + "/cuisines";
            function success(result) {
                var cuisines = result.cuisines;
                return cuisines ? defer_4.default.resolve(result) : defer_4.default.reject(new Error("invalid response"));
            }
            var params = __assign({ q: query, city_id: city_id }, extra);
            return send.call(this, url, params).then(success);
        };
        Client.prototype.cities = function (query) {
            var api_base_url = this.credentials.api_base_url;
            var url = api_base_url + "/cities";
            function success(result) {
                var location_suggestions = result.location_suggestions;
                return location_suggestions ? defer_4.default.resolve(result) : defer_4.default.reject(new Error("invalid response"));
            }
            var params = { q: query };
            return send.call(this, url, params).then(success);
        };
        Client.prototype.categories = function (params) {
            if (params === void 0) { params = {}; }
            var _a = this.credentials, access_token = _a.access_token, api_base_url = _a.api_base_url;
            var url = api_base_url + "/categories";
            function success(result) {
                return result && result.categories ? defer_4.default.resolve(result) : defer_4.default.reject(new Error("invalid response"));
            }
            return send.call(this, url, params).then(success);
        };
        Client.prototype.search = function (params) {
            if (params === void 0) { params = {}; }
            var api_base_url = this.credentials.api_base_url;
            var url = api_base_url + "/search";
            function success(result) {
                return result && result.restaurants ? defer_4.default.resolve(result) : defer_4.default.reject(new Error("invalid response"));
            }
            return send.call(this, url, params).then(success);
        };
        return Client;
    }());
    exports.default = Client;
});
define("example/ghp/js/delegates/tables/restaurants", ["require", "exports", "example/ghp/js/services/i18n", "example/ghp/js/services/zomato"], function (require, exports, i18n_5, zomato_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Delegate = /** @class */ (function () {
        function Delegate(api_credentials, filters) {
            this.client = new zomato_1.default(api_credentials);
            this.filters = filters;
        }
        Delegate.prototype.columns = function () {
            return [
                { rel: "name", name: i18n_5.default("name"), style: { width: '30%' } },
                { rel: "address", name: i18n_5.default("address"), style: { width: '70%' } },
                { rel: "rating", name: i18n_5.default("rating"), style: { width: '210px' } }
            ];
        };
        Delegate.prototype.rows = function (pagination, sorting, callback) {
            var filters = this.filters.latest;
            var client = this.client;
            var current = pagination.current, size = pagination.size;
            var start = current * size;
            var params = {};
            function toRow(_a) {
                var restaurant = _a.restaurant;
                return { restaurant: restaurant };
            }
            function loaded(response) {
                var total = response.results_found, restaurants = response.restaurants;
                var rows = restaurants.map(toRow);
                callback({ rows: rows, total: total });
            }
            function failed(error) {
                console.error(error);
                var rows = [{ error: error }];
                callback({ rows: rows });
            }
            if (filters.location && !filters.city) {
                var _a = filters.location, latitude = _a.latitude, longitude = _a.longitude;
                params.lat = latitude;
                params.lon = longitude;
            }
            if (filters.title) {
                params.q = filters.title;
            }
            if (filters.city) {
                var city_id = filters.city.id;
                params.entity_type = 'city';
                params.entity_id = city_id;
            }
            if (filters.cuisines) {
                var cuisines = filters.cuisines;
                params.cuisines = cuisines.map(function (_a) {
                    var cuisine_id = _a.cuisine_id;
                    return cuisine_id;
                }).join(",");
            }
            if (filters.category && filters.category.all !== true) {
                var category_id = filters.category.id;
                params.category = category_id;
            }
            return client.search(__assign({ start: start, count: size }, params)).then(loaded).catch(failed);
        };
        return Delegate;
    }());
    exports.default = Delegate;
});
define("example/ghp/js/delegates/menus/categories", ["require", "exports", "example/ghp/js/services/zomato", "example/ghp/js/services/i18n"], function (require, exports, zomato_2, i18n_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Delegate = /** @class */ (function () {
        function Delegate(api_credentials, filters) {
            this.client = new zomato_2.default(api_credentials);
            this.filters = filters;
            this.cache = {};
        }
        Delegate.prototype.text = function () {
            var filters = this.filters.latest;
            return filters.category ? filters.category.name : i18n_6.default("all_categories");
        };
        Delegate.prototype.options = function (callback) {
            var _a = this, client = _a.client, cache = _a.cache;
            function loaded(_a) {
                var categories = _a.categories;
                var options = categories.map(function (_a) {
                    var categories = _a.categories;
                    return categories;
                });
                cache.categories = categories;
                cache.warm = true;
                callback([{ name: i18n_6.default("all_categories"), all: true }].concat(options));
            }
            function failed(error) {
                console.error(error);
                var options = [{ error: error }];
                callback(options);
            }
            if (cache.warm) {
                return loaded(cache);
            }
            client.categories().then(loaded).catch(failed);
        };
        Delegate.prototype.translate = function (item) {
            return item.name || i18n_6.default("unknown");
        };
        Delegate.prototype.select = function (category, done) {
            var filters = this.filters;
            filters.dispatch({ field: "category", value: category });
            done();
        };
        return Delegate;
    }());
    exports.default = Delegate;
});
define("example/ghp/js/delegates/search/cities", ["require", "exports", "example/ghp/js/services/zomato", "example/ghp/js/services/i18n"], function (require, exports, zomato_3, i18n_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Delegate = /** @class */ (function () {
        function Delegate(api_credentials, filters) {
            this.client = new zomato_3.default(api_credentials);
            this.filters = filters;
            this.cache = {};
        }
        Delegate.prototype.text = function () {
            var filters = this.filters.latest;
            var cities = filters.cities;
            return cities && cities.length >= 1 ? i18n_7.default("selected") + " (" + cities.length + ")" : i18n_7.default("all_cities");
        };
        Delegate.prototype.search = function (query, callback) {
            var _a = this, client = _a.client, cache = _a.cache;
            function loaded(_a) {
                var location_suggestions = _a.location_suggestions;
                if (location_suggestions.length === 0) {
                    return callback([{ empty: true }]);
                }
                callback(location_suggestions);
            }
            function failed(error) {
                console.error(error);
                var options = [{ error: error }];
                callback(options);
            }
            if (cache.warm) {
                return loaded(cache);
            }
            client.cities(query).then(loaded).catch(failed);
        };
        Delegate.prototype.translate = function (identifier, item) {
            switch (identifier) {
                case "option":
                case "selection":
                    return item.empty ? i18n_7.default("no_results") : item.name || i18n_7.default("unknown");
                case "placeholder":
                    return i18n_7.default("search_cities");
                default:
                    return "";
            }
        };
        Delegate.prototype.select = function (value, done) {
            var filters = this.filters;
            var payloads = [{ field: "city", value: value }];
            if (value === null) {
                payloads.push({ field: "cuisines", value: null });
            }
            filters.dispatch.apply(filters, payloads);
            done(value);
        };
        return Delegate;
    }());
    exports.default = Delegate;
});
define("example/ghp/js/routes/restaurants", ["require", "exports", "example/ghp/js/services/defer", "config/environment", "example/ghp/js/services/filters", "example/ghp/js/delegates/tables/restaurants", "example/ghp/js/delegates/menus/categories", "example/ghp/js/delegates/search/cities"], function (require, exports, defer_5, env, filters_2, restaurants_1, categories_1, cities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var path = "restaurants";
    var view = "example/ghp/js/views/restaurants";
    function resolve() {
        var _a = env.zomato || {}, access_token = _a.access_token, api_base_url = _a.api_base_url;
        if (!access_token) {
            return defer_5.default.reject(new Error("invalid contentful configuration"));
        }
        var filters = new filters_2.default();
        var api_credentials = { access_token: access_token, api_base_url: api_base_url };
        var table_delegate = new restaurants_1.default({ access_token: access_token, api_base_url: api_base_url }, filters);
        var category_delegate = new categories_1.default({ access_token: access_token, api_base_url: api_base_url }, filters);
        var city_delegate = new cities_1.default({ access_token: access_token, api_base_url: api_base_url }, filters);
        return defer_5.default.resolve({
            api_credentials: api_credentials, filters: filters, table_delegate: table_delegate, category_delegate: category_delegate, city_delegate: city_delegate
        });
    }
    exports.default = { path: path, view: view, resolve: resolve };
});
define("example/ghp/js/routes/missing", ["require", "exports", "example/ghp/js/services/defer", "config/environment"], function (require, exports, defer_6, ENV) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var routing = ENV.routing;
    var path = "*";
    var view = "example/ghp/js/views/missing";
    function resolve() {
        var url = routing.base_url + "#!movies";
        return defer_6.default.reject({ code: 300, url: url });
    }
    exports.default = { path: path, view: view, resolve: resolve };
});
define("example/ghp/js/app", ["require", "exports", "example/ghp/js/components/footer", "example/ghp/js/components/header", "example/ghp/js/router", "config/environment", "example/ghp/js/routes/movies", "example/ghp/js/routes/about", "example/ghp/js/routes/restaurants", "example/ghp/js/routes/missing"], function (require, exports, footer_1, header_1, router_1, ENV, movies_5, about_1, restaurants_2, missing_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var routing = ENV.routing;
    function el(id) {
        return document.getElementById(id);
    }
    function start() {
        router_1.default.register(about_1.default);
        router_1.default.register(movies_5.default);
        router_1.default.register(restaurants_2.default);
        router_1.default.register(missing_1.default);
        router_1.default.start(routing && routing.base_url);
        ReactDOM.render(React.createElement(header_1.default, null), el("application-header"));
        ReactDOM.render(React.createElement(footer_1.default, null), el("application-footer"));
    }
    exports.start = start;
});
var __assign = (this && this.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("hoctable/utils/dom", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function addClass(element, class_name) {
        var current_value = element.className;
        var current_list = current_value.split(" ").filter(function (v) { return v.length >= 1; });
        if (current_list.indexOf(class_name) !== -1) {
            return;
        }
        current_list.push(class_name);
        element.className = current_list.join(" ");
    }
    exports.addClass = addClass;
    function removeClass(element, class_name) {
        var attr = element.className;
        var current_list = attr.split(" ").filter(function (v) { return v.length >= 1 && v !== class_name; });
        element.className = current_list.join(" ");
    }
    exports.removeClass = removeClass;
    function remove(element) {
        return element.parentNode.removeChild(element);
    }
    function contains(target, child) {
        var head = child.parentNode;
        while (head) {
            if (head === target)
                return true;
            head = head.parentNode;
        }
        return false;
    }
    function stylize(node, style) {
        var apply = node.style.setProperty.bind(node.style);
        for (var property in style) {
            var value = style[property];
            apply(property, value);
        }
        return node;
    }
    function create(tag, style, classes) {
        var element = document.createElement(tag);
        element.setAttribute("util-dom", "true");
        if (style) {
            stylize(element, style);
        }
        for (var i = 0, l = classes || [], c = l.length; i < c; i++) {
            var class_name = l[i];
            addClass(element, class_name);
        }
        return element;
    }
    exports.default = {
        classes: { add: addClass, remove: removeClass },
        create: create, remove: remove, contains: contains, stylize: stylize
    };
});
define("hoctable/utils/uuid", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var rnd_buffer = new Array(16);
    var hex_table = new Array(256);
    for (var i = 0; i < 256; ++i) {
        hex_table[i] = (i + 0x100).toString(16).substr(1);
    }
    function bytesToUuid(buf) {
        var i = 0;
        return hex_table[buf[i++]] + hex_table[buf[i++]] +
            hex_table[buf[i++]] + hex_table[buf[i++]] + "-" +
            hex_table[buf[i++]] + hex_table[buf[i++]] + "-" +
            hex_table[buf[i++]] + hex_table[buf[i++]] + "-" +
            hex_table[buf[i++]] + hex_table[buf[i++]] + "-" +
            hex_table[buf[i++]] + hex_table[buf[i++]] +
            hex_table[buf[i++]] + hex_table[buf[i++]] +
            hex_table[buf[i++]] + hex_table[buf[i++]];
    }
    function uuid() {
        var r = null;
        for (var i = 0; i < 16; i++) {
            if ((i & 0x03) === 0) {
                r = Math.random() * 0x100000000;
            }
            rnd_buffer[i] = r >>> ((i & 0x03) << 3) & 0xff;
        }
        return bytesToUuid(rnd_buffer);
    }
    exports.default = uuid;
});
define("hoctable/utils", ["require", "exports", "hoctable/utils/dom", "hoctable/utils/uuid"], function (require, exports, dom_1, uuid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function replace(target, source) {
        target.length = 0;
        for (var i = 0, c = source.length; i < c; i++) {
            target.push(source[i]);
        }
        return target;
    }
    function extend(a, b) {
        return __assign({}, a, b);
    }
    exports.default = { dom: dom_1.default, replace: replace, uuid: uuid_1.default, extend: extend };
});
define("hoctable/hoc/table", ["require", "exports", "hoctable/utils", "react", "react-dom"], function (require, exports, utils_1, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CLASSES = {
        PAGINATION: "hoctable__pagination",
        PAGINATION_EMPTY: "hoctable__pagination--empty",
        PAGINATION_CONTAINER: "hoctable__table-pagination",
        PAGINATION_CONTROLS: "hoctable__pagination-controls",
        PAGINATION_NEXT: "hoctable__pagination-next",
        PAGINATION_PREVIOUS: "hoctable__pagination-previous",
        PAGINATION_TOTAL: "hoctable__pagination-total",
        PAGINATION_INFO: "hoctable__pagination-info",
        TABLE: "hoctable__table",
        TABLE_TBODY: "hoctable__table-tbody",
        TABLE_HEAD: "hoctable__table-head",
        TABLE_CONTAINER: "hoctable__table-container",
        TABLE_HEADER_CELL: "hoctable__table-header-cell",
        TABLE_HEADER_CELL_ACTIVE: "hoctable__table-header-cell--active",
        TABLE_HEADER_CELL_SORTABLE: "hoctable__table-header-cell--sortable"
    };
    // This component is used by the table to handle updating it's pagination references and subsequently re-rendering.
    var Pagination = (function (_super) {
        __extends(Pagination, _super);
        function Pagination(props) {
            return _super.call(this, props) || this;
        }
        Pagination.prototype.render = function () {
            var _a = this.props, move = _a.move, pagination = _a.pagination;
            var total = pagination.total, size = pagination.size, current = pagination.current;
            var update = this.forceUpdate.bind(this);
            // Do nothing but render out an empty div if we have no pagination information
            if (total >= 1 === false) {
                return (React.createElement("div", { className: exports.CLASSES["PAGINATION_EMPTY"] }));
            }
            var first = current * size;
            var end = first + size;
            function go(amt) {
                move(current + amt, update);
            }
            function previous() {
                return go(-1);
            }
            function next() {
                return go(1);
            }
            var buttons = [];
            // If we're no longer on the first page, render our back button
            if (current >= 1) {
                buttons.push(React.createElement("a", { className: exports.CLASSES["PAGINATION_PREVIOUS"], onClick: previous, key: "previous" }, "previous"));
            }
            /* If we're both able to identify the last index we "would" render, and that index is less than the total amount of
             * items that our delegate told us it has, render our next button.
             */
            if (end && end < total) {
                buttons.push(React.createElement("a", { className: exports.CLASSES["PAGINATION_NEXT"], onClick: next, key: "next" }, "next"));
            }
            // Calculate the max page if the delegate had a non-zero positive total and we're rendering more than one item.
            var max_page = total >= 1 && size >= 1 ? Math.ceil(total / size) : 0;
            return (React.createElement("div", { className: exports.CLASSES["PAGINATION"] }, React.createElement("div", { className: exports.CLASSES["PAGINATION_INFO"], "data-single-page": max_page === 1 }, React.createElement("p", null, "page ", current + 1, " of ", max_page, " ", React.createElement("span", { className: exports.CLASSES["PAGINATION_TOTAL"] }, "(", total, " results)"))), React.createElement("div", { className: exports.CLASSES["PAGINATION_CONTROLS"] }, buttons)));
        };
        return Pagination;
    }(React.Component));
    exports.Pagination = Pagination;
    /* In order to allow users to _optionally_ provide a column header transclusion, the table delegates the construction
     * of a column header component to this factory.
     */
    function ColumnFactory(Transclusion) {
        var ColumnHeader = (function (_super) {
            __extends(ColumnHeader, _super);
            function ColumnHeader(props) {
                return _super.call(this, props) || this;
            }
            ColumnHeader.prototype.sort = function () {
                var _a = this.props, sort = _a.sort, column = _a.column;
                var update = this.forceUpdate.bind(this);
                if (column.sortable !== true) {
                    return;
                }
                sort(column, update);
            };
            ColumnHeader.prototype.render = function () {
                var _a = this.props, column = _a.column, flags = _a.flags;
                var name = column.name, sortable = column.sortable, user_classes = column.classes;
                var class_list = (user_classes || []).concat(exports.CLASSES["TABLE_HEADER_CELL"]);
                // If this column's sort relationship matched that of the table, add our table header active class to the ele
                if (flags && flags.active === true) {
                    class_list.push(exports.CLASSES["TABLE_HEADER_CELL_ACTIVE"]);
                }
                if (sortable === true) {
                    class_list.push(exports.CLASSES["TABLE_HEADER_CELL_SORTABLE"]);
                }
                var content = React.createElement("div", { className: exports.CLASSES["TH_CELL"] }, React.createElement("span", null, name));
                // If there was user-provided transclusion, replace the content with a new instance of that transclusion.
                if (Transclusion) {
                    content = React.createElement(Transclusion, { sort: this.sort, column: column, flags: flags });
                }
                return React.createElement("th", { className: class_list.join(" "), onClick: this.sort.bind(this) }, content);
            };
            return ColumnHeader;
        }(React.Component));
        return ColumnHeader;
    }
    /* This factory defines a high order table component that accepts transclusions for both it's row component and it's
     * table header cell component. The table's delegate is relied upon to provide the column definition objects as well
     * as the data that will ultimately be used to render instances of the transcluded row component.
     */
    function TableFactory(Row, Column) {
        // Create the header cell by transcluding the user-provided component to our column factory
        var HeaderCell = ColumnFactory(Column);
        var PagedTable = (function (_super) {
            __extends(PagedTable, _super);
            function PagedTable(props) {
                var _this = _super.call(this, props) || this;
                /* Prepare an array to hold of the html nodes that we create during our renders so that we can delete them and
                 * unmount components later.
                 */
                _this.bodies = [];
                // If initial sorting + pagination information was provided, update to align w/ that information
                _this.state = {
                    sorting: props.sorting || null,
                    pagination: props.pagination || { size: 10, current: 0, total: 0 }
                };
                return _this;
            }
            PagedTable.prototype.componentWillUnmount = function () {
                this.render_request = null;
            };
            /* During the rendering of the table, it will attempt to assign this function to the table element's 'ref' react
             * property. Once called, this function will attempt to load in the delegate's row data via it's `rows` function
             * and subsequently iterate over each elment, rendering it into place.
             */
            PagedTable.prototype.transclude = function (table) {
                var _this = this;
                var _a = this, props = _a.props, bodies = _a.bodies, refs = _a.refs, state = _a.state;
                var sorting = state.sorting, pagination = state.pagination;
                var delegate = props.delegate;
                if (!table) {
                    return;
                }
                var pagination_props = { pagination: pagination, move: this.move.bind(this) };
                var current_request = this.render_request = utils_1.default.uuid();
                var render = function (data) {
                    var rows = data.rows, total = data.total;
                    var render_request = _this.render_request;
                    // Prevent rendering if not latest.
                    if (render_request !== current_request) {
                        return;
                    }
                    // Remove the previous pagination component.
                    var pager = refs["pager"];
                    ReactDOM.unmountComponentAtNode(pager);
                    // Cleanup previous tbody elements.
                    while (bodies.length) {
                        var next = bodies.splice(0, 1)[0];
                        ReactDOM.unmountComponentAtNode(next);
                        utils_1.default.dom.remove(next);
                    }
                    /* Iterate over the row data, creating a <tbody> container for them and rendering a new instance of the `Row`
                     * transclusion into it; preserving the strict html table hierachy rules.
                     */
                    for (var i = 0, c = rows.length; i < c; i++) {
                        var row = rows[i];
                        var body = utils_1.default.dom.create("tbody", null, [exports.CLASSES["TABLE_TBODY"]]);
                        ReactDOM.render(React.createElement(Row, { row: row }), body);
                        table.appendChild(body);
                        bodies.push(body);
                    }
                    // Update our pagination's reference to the total amount of data (as returned by the delegate)
                    pagination.total = total;
                    // Render the pagination component
                    ReactDOM.render(React.createElement(Pagination, __assign({}, pagination_props)), pager);
                };
                // Start the data source loading
                delegate.rows(pagination, sorting, render);
            };
            PagedTable.prototype.move = function (new_page, done) {
                var state = this.state;
                var pagination = __assign({}, state.pagination, { current: new_page });
                this.setState({ pagination: pagination });
                done();
            };
            PagedTable.prototype.sort = function (column, done) {
                var rel = column.rel;
                var sorting = this.state.sorting;
                var direction = (sorting || { direction: false }).direction;
                if (sorting && sorting.rel === rel) {
                    direction = !direction;
                }
                sorting = { rel: rel, direction: direction };
                this.setState({ sorting: sorting });
                done();
            };
            PagedTable.prototype.render = function () {
                var sorting = this.state.sorting;
                var delegate = this.props.delegate;
                var head = { cols: [], cells: [] };
                /* Ask the delegate for it's columns and iterate over each, creating a table header cell and a colgroup <col />
                 * element in order to keep the body's column width equal to that of the header's.
                 */
                for (var i = 0, columns = delegate.columns(), c = columns.length; i < c; i++) {
                    var column = columns[i];
                    var active = sorting && column.rel === sorting.rel;
                    var flags = { active: active };
                    // Create and insert the column (which may itself have a transclusion).
                    head.cells.push(React.createElement(HeaderCell, { column: column, key: column.rel, sort: this.sort.bind(this), flags: flags }));
                    // Create a <col> element for the colgroup with the style (if any) specified on the column object.
                    head.cols.push(React.createElement("col", { className: column.rel, key: column.rel, style: column.style }));
                }
                return (React.createElement("div", { className: exports.CLASSES["TABLE"] }, React.createElement("div", { className: exports.CLASSES["PAGINATION_CONTAINER"], ref: "pager" }), React.createElement("div", { className: exports.CLASSES["TABLE_CONTAINER"] }, React.createElement("table", { className: exports.CLASSES["TABLE_TABLE"], ref: this.transclude.bind(this) }, React.createElement("colgroup", null, head.cols), React.createElement("thead", { className: exports.CLASSES["TABLE_HEAD"] }, React.createElement("tr", null, head.cells))))));
            };
            return PagedTable;
        }(React.Component));
        return PagedTable;
    }
    exports.default = TableFactory;
});
define("hoctable/services/window", ["require", "exports", "hoctable/utils"], function (require, exports, utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MouseState = (function () {
        function MouseState() {
            this.start = this.end = this.current = { x: -1, y: -1 };
        }
        return MouseState;
    }());
    var ENTER_FULLSCREEN = [
        "requestFullscreen",
        "webkitRequestFullscreen",
        "mozRequestFullScreen",
        "msRequestFullscreen"
    ];
    var EXIT_FULLSCREEN = [
        "exitFullscreen",
        "webkitExitFullscreen",
        "mozCancelFullScreen",
        "msExitFullscreen"
    ];
    var FULLSCREEN_ELEMENT = [
        "fullscreenElement",
        "webkitFullscreenElement",
        "mozFullScreenElement",
        "msFullscreenElement"
    ];
    var FULLSCREEN_ERROR = [
        "fullscreenerror",
        "webkitfullscreenerror",
        "mozfullscreenerror"
    ];
    var FULLSCREEN_CHANGE = [
        "fullscreenchange",
        "webkitfullscreenchange",
        "mozfullscreenchange"
    ];
    var internal_state = {
        mouse: new MouseState(),
        listeners: [],
        bound: false,
        document_events: {},
    };
    function on(event_name, handler, context) {
        var id = utils_2.default.uuid();
        internal_state.listeners.push({ event_name: event_name, id: id, handler: handler, context: context });
        return id;
    }
    function off(id) {
        var listeners = internal_state.listeners;
        for (var i = 0, c = listeners.length; i < c; i++) {
            var l = listeners[i];
            if (l.id !== id) {
                continue;
            }
            listeners.splice(i, 1);
            return id;
        }
        return -1;
    }
    function trigger(evt, fn) {
        var before = "function" === typeof fn ? fn : function () { };
        function handler(e) {
            var listeners = internal_state.listeners;
            before(e);
            for (var i = 0, c = listeners.length; i < c; i++) {
                var _a = listeners[i], event_name = _a.event_name, listener_fn = _a.handler, context = _a.context;
                if (evt === event_name) {
                    listener_fn.call(context, e);
                }
            }
        }
        return handler;
    }
    var middleware = {
        move: function (e) {
            var mouse = internal_state.mouse;
            mouse.current = { x: e.clientX, y: e.clientY };
        },
        down: function (e) {
            var mouse = internal_state.mouse;
            mouse.start = { x: e.clientX, y: e.clientY };
        },
        up: function (e) {
            var mouse = internal_state.mouse;
            mouse.end = { x: e.clientX, y: e.clientY };
        },
        click: function (e) {
            var mouse = internal_state.mouse;
            var start = mouse.start, end = mouse.end;
            // If the mouse moved during the click, do nothing.
            if (start.x !== end.x || start.y !== end.y) {
                return;
            }
            trigger("isoclick")(e);
        },
        keydown: function (e) {
            var keyCode = e.keyCode;
            if (keyCode === 27)
                trigger("escape")(e);
        }
    };
    function unbind() {
        var listeners = internal_state.listeners;
        listeners.length = 0;
        for (var key in internal_state.document_events) {
            var listener = internal_state.document_events[key];
            document.removeEventListener(key, listener);
        }
        internal_state.bound = false;
    }
    internal_state.document_events["click"] = trigger("click", middleware.click);
    internal_state.document_events["mousedown"] = trigger("mousedown", middleware.down);
    internal_state.document_events["mousemove"] = trigger("mousemove", middleware.move);
    internal_state.document_events["mouseup"] = trigger("mouseup", middleware.up);
    internal_state.document_events["keyup"] = trigger("keyup");
    internal_state.document_events["keydown"] = trigger("keydown", middleware.keydown);
    internal_state.document_events["touchstart"] = trigger("touchstart");
    internal_state.document_events["touch_end"] = trigger("touch_end");
    for (var i = 0, c = ENTER_FULLSCREEN.length; i < c; i++) {
        var enter_fn = ENTER_FULLSCREEN[i];
        if (typeof document.body[enter_fn] !== "function") {
            continue;
        }
        var change_event = FULLSCREEN_CHANGE[i];
        var error_event = FULLSCREEN_ERROR[i];
        if (change_event && error_event) {
            internal_state.document_events[change_event] = trigger("fullscreenchange");
            internal_state.document_events[error_event] = trigger("fullscreenerror");
        }
    }
    function bind() {
        var bound = internal_state.bound;
        if (bound) {
            return;
        }
        internal_state.bound = true;
        internal_state.mouse = new MouseState();
        for (var key in internal_state.document_events) {
            var listener = internal_state.document_events[key];
            document.addEventListener(key, listener);
        }
    }
    function dimensions() {
        var width = window.innerWidth, height = window.innerHeight;
        return { width: width, height: height };
    }
    function scroll() {
        var x = window.scrollX, y = window.scrollY;
        return { x: x, y: y };
    }
    var fullscreen = {
        open: function (el) {
            var fn = null;
            var vendors = (el === null ? EXIT_FULLSCREEN : ENTER_FULLSCREEN).slice(0);
            if (el === null) {
                el = document;
            }
            while (!fn && vendors.length) {
                var name_1 = vendors.shift();
                fn = el[name_1];
            }
            // Browser does not support fullscreen
            if (typeof fn !== "function") {
                return false;
            }
            return fn.call(el) || true;
        },
        get current() {
            var result = null;
            var vendors = FULLSCREEN_ELEMENT.slice(0);
            while (!result && vendors.length) {
                result = document[vendors.shift()] || null;
            }
            return result;
        }
    };
    exports.default = {
        on: on, off: off, bind: bind, dimensions: dimensions, scroll: scroll, fullscreen: fullscreen, unbind: unbind
    };
});
define("hoctable/services/popups", ["require", "exports", "hoctable/utils", "hoctable/services/window", "react-dom"], function (require, exports, utils_3, window_1, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GUTTER_WIDTH = 10;
    exports.SYNC_WAIT_TIME = 3;
    var SyncGroup = (function () {
        function SyncGroup() {
            this.pool = [];
        }
        SyncGroup.prototype.add = function (identifier) {
            var timeout = this.timeout;
            this.pool.push(identifier);
            if (timeout !== null) {
                clearTimeout(timeout);
            }
            this.timeout = setTimeout(this.flush.bind(this), exports.SYNC_WAIT_TIME);
        };
        // After every addition of a new popup, this function will clear the list of opening poups.
        SyncGroup.prototype.flush = function () {
            this.pool.length = 0;
        };
        /* This function is used during click events to check if the click event is associated with a popup that was opened
         * in the same click event process.
         */
        SyncGroup.prototype.release = function (identifier) {
            var index = this.pool.indexOf(identifier);
            return index !== -1 ? !!this.pool.splice(index, 1) : false;
        };
        return SyncGroup;
    }());
    var InteralState = (function () {
        function InteralState() {
            this.popups = [];
            this.subscriptions = [];
            this.sync_group = new SyncGroup();
        }
        return InteralState;
    }());
    var internal_state = new InteralState();
    function open(component, placement) {
        var root = internal_state.root, popups = internal_state.popups, sync_group = internal_state.sync_group;
        // Invalid open attempt - no mount point setup yet.
        if (!root) {
            return -1;
        }
        // Create the html style properties that will be assigned to the container.
        var style = {
            top: placement.top + "px",
            right: placement.right + "px",
            position: "absolute"
        };
        // If the `left` property was provided and right was not, use left. This allows `right` to take precendence.
        if (placement.left && !placement.right) {
            style.left = placement.left + "px";
        }
        // Create the unique id for this popup and the container it will be rendered into.
        var id = utils_3.default.uuid();
        var node = utils_3.default.dom.create("div", style);
        // Render the component into the container and add it to our popup root.
        ReactDOM.render(component, node);
        root.appendChild(node);
        // Add a reference to our internal state manager and send the id to the sync group.
        popups.push({ id: id, node: node });
        sync_group.add(id);
        return id;
    }
    function close(popup_id) {
        var open_popups = internal_state.popups;
        for (var i = 0, c = open_popups.length; i < c; i++) {
            var _a = open_popups[i], id = _a.id, node = _a.node;
            if (id !== popup_id) {
                continue;
            }
            var dom_node = ReactDOM.findDOMNode(node);
            ReactDOM.unmountComponentAtNode(dom_node);
            dom_node.parentNode.removeChild(dom_node);
            open_popups.splice(i, 1);
            return 0;
        }
        return -1;
    }
    function closeOpen(trigger) {
        var open_popups = internal_state.popups, sync_group = internal_state.sync_group;
        var target = trigger.target;
        // Iterate over our open popups closing those that are not associated with this event
        for (var i = 0, count = open_popups.length; i < count; i++) {
            var _a = open_popups[i], id = _a.id, node = _a.node;
            var dom_node = ReactDOM.findDOMNode(node);
            // If this node is inside the target of the click - continue
            if (sync_group.release(id) || utils_3.default.dom.contains(dom_node, target)) {
                continue;
            }
            // Otherwise close it
            return close(id);
        }
        return 0;
    }
    function mount(target) {
        var subscriptions = internal_state.subscriptions;
        internal_state.root = target;
        for (var i = 0, c = subscriptions.length; i < c; i++) {
            window_1.default.off(subscriptions[i]);
        }
        utils_3.default.replace(subscriptions, [
            window_1.default.on("isoclick", closeOpen),
            window_1.default.on("touchstart", closeOpen),
            window_1.default.on("escape", closeOpen)
        ]);
    }
    function unmount() {
        var open_popups = internal_state.popups;
        internal_state.root = null;
        while (open_popups.length) {
            close(open_popups[0].id);
        }
    }
    exports.default = { open: open, close: close, mount: mount, unmount: unmount };
});
define("hoctable/hoc/menu", ["require", "exports", "hoctable/services/popups", "hoctable/services/window", "react"], function (require, exports, popups_1, window_2, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TARGET_TOP_BUFFER = 3;
    exports.CLASSES = {
        MENU: "hoctable__menu",
        MENU_DEFAULT_BUTTON: "hoctable__menu-default-button",
        MENU_BUTTON_CONTAINER: "hoctable__menu-button-container",
    };
    function bottom(box) {
        return box.top + box.height;
    }
    function DefaultButton(props) {
        var text = props.text;
        return (React.createElement("a", { className: exports.CLASSES.MENU_DEFAULT_BUTTON }, text));
    }
    exports.DefaultButton = DefaultButton;
    function Factory(Popup, Button) {
        if (Button === void 0) {
            Button = DefaultButton;
        }
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu(props) {
                var _this = _super.call(this, props) || this;
                _this.open = _this.open.bind(_this);
                _this.state = { popup: null };
                return _this;
            }
            Menu.prototype.componentWillUnmount = function () {
                var state = this.state;
                popups_1.default.close(state.popup);
            };
            Menu.prototype.open = function (trigger) {
                var _this = this;
                var button = this.refs["button"];
                var bounding = button.getBoundingClientRect();
                /* Get the current top of the window, this will need to be added to the position that
                 * we use to place the popup, which will go below the button that was clicked.
                 */
                var win_top = window_2.default.scroll().y;
                var window_width = window_2.default.dimensions().width;
                // Calculate the top.
                var top = bottom(bounding) + TARGET_TOP_BUFFER + win_top;
                // Create our placement object using the provided bounding box.
                var placement = { top: top, left: bounding.left };
                // If we're on the right side of the screen, move the menu to be right aligned
                if (bounding.left > window_width * 0.5) {
                    placement.right = window_width - (bounding.left + bounding.width);
                }
                var popup = null;
                var close = function () {
                    popups_1.default.close(popup);
                    _this.setState({ popup: null });
                };
                var redraw = function () {
                    _this.setState({ updated: Date.now() });
                };
                // Open the popup component with all of the props that were given to us
                popup = popups_1.default.open(React.createElement(Popup, __assign({}, this.props, { close: close, redraw: redraw })), placement);
                if (popup === -1) {
                    throw new Error("unable to open popup, is service mounted?");
                }
                // Update our state with the popup id so we may close it on unmount
                this.setState({ popup: popup });
            };
            Menu.prototype.render = function () {
                return (React.createElement("div", { className: exports.CLASSES.MENU }, React.createElement("div", { className: exports.CLASSES.MENU_BUTTON_CONTAINER, onClick: this.open, ref: "button" }, React.createElement(Button, __assign({}, this.props)))));
            };
            return Menu;
        }(React.Component));
        return Menu;
    }
    exports.default = Factory;
});
define("hoctable/hoc/select", ["require", "exports", "hoctable/hoc/menu", "hoctable/utils", "react", "react-dom"], function (require, exports, menu_1, utils_4, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CLASSES = {
        SELECT: "hoctable__select",
        SELECT_OPTION: "hoctable__select-option",
        SELECT_LOADING: "hoctable__select-option--loading",
        SELECT_OPTION_CONTAINER: "hoctable__select-option--container",
        SELECT_BUTTON: "hoctable__select-toggle"
    };
    function DefaultButton(_a) {
        var delegate = _a.delegate;
        return (React.createElement("a", { className: exports.CLASSES["SELECT_BUTTON"] }, delegate.text()));
    }
    exports.DefaultButton = DefaultButton;
    function DefaultLoading() {
        return (React.createElement("div", { className: exports.CLASSES["SELECT_LOADING"] }, React.createElement("p", null, "loading")));
    }
    exports.DefaultLoading = DefaultLoading;
    function ItemFactory(Inner) {
        function Item(props) {
            var delegate = props.delegate, option = props.option, signals = props.signals;
            var content = Inner ? React.createElement(Inner, __assign({}, props)) : (React.createElement("p", null, delegate.translate(option)));
            function finished(flags) {
                signals.selection(flags && flags.remain_open === true);
            }
            function select() {
                return delegate.select(option, finished);
            }
            return (React.createElement("div", { className: exports.CLASSES["SELECT_OPTION"], onClick: select }, content));
        }
        return Item;
    }
    function Factory(ItemType, ButtonComponent, Loading) {
        if (ButtonComponent === void 0) {
            ButtonComponent = DefaultButton;
        }
        if (Loading === void 0) {
            Loading = DefaultLoading;
        }
        var Item = ItemFactory(ItemType);
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu(props) {
                var _this = _super.call(this, props) || this;
                _this.options = [];
                _this.transclude = _this.transclude.bind(_this);
                return _this;
            }
            Menu.prototype.componentWillUnmount = function () {
                var options = this.options;
                // Cleanup previously rendered items.
                while (options.length) {
                    var next = options.splice(0, 1)[0];
                    ReactDOM.unmountComponentAtNode(next);
                    utils_4.default.dom.remove(next);
                }
                this.render_request = null;
            };
            Menu.prototype.transclude = function (list_el) {
                var _this = this;
                var _a = this.props, delegate = _a.delegate, close = _a.close, redraw = _a.redraw;
                var options = this.options;
                if (!list_el) {
                    return;
                }
                var selection = function (remain_open) {
                    _this.setState({ updated: Date.now() });
                    return remain_open ? redraw() : close();
                };
                var signals = { selection: selection };
                var current_request = this.render_request = utils_4.default.uuid();
                var render = function (option_list) {
                    var render_request = _this.render_request;
                    // If the component was unmounted during an attempt to load options do nothing
                    if (render_request !== current_request) {
                        return;
                    }
                    // Cleanup previous rendered options
                    while (options.length) {
                        var next = options.splice(0, 1)[0];
                        ReactDOM.unmountComponentAtNode(next);
                        utils_4.default.dom.remove(next);
                    }
                    // Iterate over the items provided by the delegate, rendering them.
                    for (var i = 0, c = option_list.length; i < c; i++) {
                        var option = option_list[i];
                        var body = utils_4.default.dom.create("div", null, [exports.CLASSES["SELECT_OPTION_CONTAINER"]]);
                        ReactDOM.render(React.createElement(Item, { delegate: delegate, option: option, signals: signals }), body);
                        list_el.appendChild(body);
                        options.push(body);
                    }
                };
                // If we did not previously have menu items, gracefully display a loading element.
                if (options.length === 0) {
                    var body = document.createElement("div");
                    ReactDOM.render(React.createElement(Loading, null), body);
                    list_el.appendChild(body);
                    options.push(body);
                }
                delegate.options(render.bind(this));
            };
            Menu.prototype.render = function () {
                var transclude = this.transclude.bind(this);
                return (React.createElement("div", { className: exports.CLASSES["SELECT"], ref: transclude }));
            };
            return Menu;
        }(React.Component));
        // The select is really just a menu who's body is a little bit smarter.
        return menu_1.default(Menu, ButtonComponent);
    }
    exports.default = Factory;
});
define("hoctable/hoc/search", ["require", "exports", "hoctable/utils", "hoctable/services/popups", "react"], function (require, exports, utils_5, popups_2, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CLASSES = {
        SEARCH: "hoctable__search",
        SEARCH_FILLED: "hoctable__search--filled",
        SEARCH_POPUP: "hoctable__search-popup",
        INPUT_CONTAINER: "hoctable__search-input-container",
        RESULTS_PLACEHOLDER: "hoctable__search-results-placeholder",
        SELECTION_CONTROLS: "hoctable__search-selection-control",
        SELECTION_CLEAR_CONTROL: "hoctable__search-clear-selection-control",
        CLEAR_CONTROL_ICON: "hoctable__search-selection-clear-icon",
        ITEM_CONTAINER: "hoctable-search-results-item",
        CONTROLS: "hoctable__search-controls"
    };
    exports.DEBOUNCE_TIME = 300;
    function c(lookup) {
        return exports.CLASSES[lookup];
    }
    function DefaultItem(props) {
        var option = props.option, delegate = props.delegate;
        return (React.createElement("div", { className: c("ITEM_CONTAINER") }, React.createElement("p", null, delegate.translate("option", option))));
    }
    exports.DefaultItem = DefaultItem;
    function SelectionControl(props) {
        var clear = props.clear;
        return (React.createElement("div", { className: c("SELECTION_CONTROLS") }, React.createElement("div", { className: c("SELECTION_CLEAR_CONTROL"), onClick: clear }, React.createElement("i", { className: c("CLEAR_CONTROL_ICON") }))));
    }
    function ItemContainer(props) {
        var signals = props.signals, item = props.item;
        var select = signals.select.bind(null, item);
        return (React.createElement("div", { className: c("SEARCH_ITEM_CONTAINER"), onClick: select }, props.children));
    }
    function Factory(ItemComponent) {
        var Search = (function (_super) {
            __extends(Search, _super);
            function Search(props) {
                var _this = _super.call(this, props) || this;
                _this.state = {};
                _this.rendered_items = [];
                return _this;
            }
            Search.prototype.componentWillUnmount = function () {
                var popup_handle = this.popup_handle;
                this.render_request = null;
                popups_2.default.close(popup_handle);
            };
            Search.prototype.transclude = function (search_query) {
                var _this = this;
                var _a = this, props = _a.props, rendered_items = _a.rendered_items;
                var delegate = props.delegate;
                var done = function (selected_item) {
                    var popup_handle = _this.popup_handle;
                    popups_2.default.close(popup_handle);
                    _this.setState({ selected_item: selected_item });
                };
                var select = function (item) {
                    delegate.select(item, done);
                };
                var signals = { select: select };
                var current_request = this.render_request = utils_5.default.uuid();
                var render = function (results) {
                    var placeholder = _this.refs["placeholder"];
                    var render_request = _this.render_request;
                    // Do nothing if the request id we aquired is no longer up to date.
                    if (render_request === null || render_request !== current_request) {
                        return;
                    }
                    var _a = placeholder.getBoundingClientRect(), left = _a.left, top = _a.top;
                    var popup_children = [];
                    for (var i = 0, x = results.length; i < x; i++) {
                        var item_data = results[i];
                        var uuid = utils_5.default.uuid();
                        var item_props = ItemComponent ? { option: item_data } : { option: item_data, delegate: delegate };
                        var inner = ItemComponent ? (React.createElement(ItemComponent, __assign({}, item_props))) : (React.createElement(DefaultItem, __assign({}, item_props)));
                        var node = (React.createElement(ItemContainer, { signals: signals, item: item_data, key: uuid }, inner));
                        rendered_items.push({ node: node, uuid: uuid });
                        popup_children.push(node);
                    }
                    var popup_node = (React.createElement("div", { className: c("SEARCH_POPUP") }, popup_children));
                    // We should now safely close the previous popup
                    popups_2.default.close(_this.popup_handle);
                    _this.popup_handle = popups_2.default.open(popup_node, { left: left, top: top });
                };
                delegate.search(search_query, render);
            };
            Search.prototype.render = function () {
                var _this = this;
                var _a = this, props = _a.props, state = _a.state;
                var delegate = props.delegate;
                var selected_item = state.selected_item;
                var value = selected_item ? delegate.translate("selection", selected_item) : (state.value || "");
                var done = function (selection) {
                    _this.setState({ selected_item: selection });
                };
                var search = function (_a) {
                    var target = _a.target;
                    var new_value = target.value;
                    var update = _this.transclude.bind(_this, new_value);
                    if (_this.state.timer) {
                        clearTimeout(_this.state.timer);
                    }
                    var timer = setTimeout(update, exports.DEBOUNCE_TIME);
                    if (selected_item) {
                        state.timer = timer;
                        state.value = new_value;
                        return delegate.select(null, done);
                    }
                    _this.setState({ timer: timer, value: new_value, selected_item: null });
                };
                var clear = function () {
                    var current_state = _this.state;
                    clearTimeout(current_state.timer);
                    // Clear out the value in the input element.
                    current_state.value = "";
                    return delegate.select(null, done);
                };
                var control = selected_item ? React.createElement(SelectionControl, { clear: clear }) : null;
                var classlist = selected_item ? [c("SEARCH"), c("SEARCH_FILLED")] : [c("SEARCH")];
                return (React.createElement("div", { className: classlist.join(" "), "data-has-selection": !!selected_item }, React.createElement("div", { className: c("CONTROLS") }, control), React.createElement("div", { className: c("INPUT_CONTAINER") }, React.createElement("input", { type: "text", placeholder: delegate.translate("placeholder"), onChange: search, value: value })), React.createElement("div", { className: c("RESULTS_PLACEHOLDER"), ref: "placeholder" })));
            };
            return Search;
        }(React.Component));
        return Search;
    }
    exports.default = Factory;
});
define("hoctable/hoc/wall", ["require", "exports", "hoctable/utils", "hoctable/services/window", "react", "react-dom"], function (require, exports, utils_6, window_3, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ItemDelegate = (function () {
        function ItemDelegate(item, highlight) {
            this.actions = { highlight: highlight };
            this.item = item;
        }
        ItemDelegate.prototype.highlight = function (rendered_id) {
            var actions = this.actions;
            actions.highlight(rendered_id);
        };
        return ItemDelegate;
    }());
    exports.ItemDelegate = ItemDelegate;
    exports.CLASSES = {
        WALL: "hoctable__wall",
        WALL_CONTROLS: "hoctable__wall-controls",
        WALL_CONTROL_IN: "hoctable__wall-control-in",
        WALL_CONTROL_OUT: "hoctable__wall-control-out",
        WALL_VIEWPORT: "hoctable__wall-viewport",
        WALL_ITEM: "hoctable__wall-item",
        WALL_CLEARFIX: "hoctable__wall-clearfix",
        WALL_ITEM_EVENTS: "hoctable__wall-item-events",
        WALL_HIGHLIGHT: "hoctable__wall-highlight",
        WALL_HIGHLIGHT_ITEM: "hoctable__wall-highlight-item",
        WALL_ACTIVE_MODIFIER: "hoctable__wall-active-item"
    };
    exports.MAX_COLUMNS = 12;
    exports.CYCLE_INTERVAL = 5000;
    exports.DEBOUNCEMENT = 300;
    exports.FULLSCREEN_DELAY = 300;
    var TransitionTimings = (function () {
        function TransitionTimings() {
            this.current = null;
        }
        TransitionTimings.prototype.enqueue = function (handler, context, delay) {
            if (delay === void 0) {
                delay = exports.DEBOUNCEMENT;
            }
            var current = this.current;
            if (current !== null) {
                clearTimeout(current);
            }
            // Do nothing if we were given nothing for our instruction.
            if (handler === null) {
                return;
            }
            function exec() {
                handler.call(context);
            }
            this.current = setTimeout(exec, delay);
        };
        TransitionTimings.prototype.interval = function (handler, context, delay) {
            var _this = this;
            if (delay === void 0) {
                delay = exports.DEBOUNCEMENT;
            }
            var interval_id = this.interval_id;
            var exec = function () { return _this.enqueue(handler, context, 0); };
            if (interval_id !== null) {
                this.stop();
            }
            this.interval_id = setInterval(exec, delay);
        };
        TransitionTimings.prototype.stop = function () {
            var interval_id = this.interval_id;
            clearInterval(interval_id);
            this.interval_id = null;
        };
        return TransitionTimings;
    }());
    exports.TransitionTimings = TransitionTimings;
    function GridItemFactory(Transclusion) {
        var GridItem = (function (_super) {
            __extends(GridItem, _super);
            function GridItem(props) {
                return _super.call(this, props) || this;
            }
            GridItem.prototype.render = function () {
                var props = this.props;
                var delegate = props.delegate, uuid = props.uuid;
                var events = {
                    onMouseOver: function () { delegate.highlight(uuid); },
                    onMouseOut: function () { delegate.highlight(null); }
                };
                return (React.createElement("div", __assign({ className: exports.CLASSES["WALL_ITEM"] }, events), React.createElement(Transclusion, { item: delegate.item })));
            };
            return GridItem;
        }(React.Component));
        return GridItem;
    }
    exports.GridItemFactory = GridItemFactory;
    function WallFactory(Preview, Card) {
        var GridItem = GridItemFactory(Preview);
        // Used during intervals, this function cycles the currently "highlighted" item randomly.
        function cycle() {
            var _a = this, renderer = _a.renderer, uuid_pool = _a.uuid_pool, subscriptions = _a.subscriptions;
            // Stop if we've lost our renderer or have been unmounted
            if (!renderer || !subscriptions["fullscreen:error"] || !subscriptions["fullscreen:change"]) {
                return;
            }
            var current = renderer.highlight;
            var max_tries = Math.max(uuid_pool.length, 300);
            var next = current;
            var attempts = 0;
            // If there are no rendered items, do nothing.
            if (uuid_pool.length === 0) {
                return;
            }
            while (next === current && attempts < max_tries) {
                // Attempt to randomly load a new item id to highlight.
                var rand = Math.floor(Math.random() * uuid_pool.length) % uuid_pool.length;
                next = uuid_pool[rand];
                // Get the rendered item and check location
                var container = renderer.find(next).container;
                var top_1 = container.getBoundingClientRect().top;
                // If we're below the screen, foce skip.
                if (top_1 >= window_3.default.dimensions().height) {
                    next = current;
                }
                // Safety check.
                attempts++;
            }
            this.highlight(next);
        }
        /**
         * This class is responsible for positioning each item in the viewport as well as "opening" the highlighted
         * element during cycle intervals and user interactions.
         */
        var Renderer = (function () {
            function Renderer(list, left, right) {
                this.viewports = { list: list, left: left, right: right };
                this.rendered = [];
                this.active = null;
            }
            Object.defineProperty(Renderer.prototype, "size", {
                get: function () {
                    var viewports = this.viewports;
                    if (!viewports.list) {
                        return { width: 0, height: 0 };
                    }
                    return viewports.list.getBoundingClientRect();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Renderer.prototype, "highlight", {
                get: function () {
                    return this.active ? this.active.uuid : null;
                },
                set: function (rendered_id) {
                    var _a = this, viewports = _a.viewports, active = _a.active;
                    var _b = window_3.default.dimensions(), vw = _b.width, vh = _b.height;
                    var source = this.find(rendered_id);
                    // If the id sent in was null and there is no active highlight, do nothing.
                    if (rendered_id === null && !active) {
                        return;
                    }
                    /* If the id sent in was null, it is time to clear out the existing highlight by unmounting the car, removing
                     * the container from the dom and clearing out the active reference.
                     */
                    if (rendered_id === null) {
                        var active_container = active.container, active_uuid = active.uuid;
                        // Find the rendered grid item associated w/ the active highlight
                        var grid_item = this.find(active_uuid);
                        // Remove the modifier class from the related grid container
                        if (grid_item) {
                            utils_6.default.dom.classes.remove(grid_item.container, exports.CLASSES["WALL_ACTIVE_MODIFIER"]);
                        }
                        // Unmount the highlight container & remove the div created for it
                        ReactDOM.unmountComponentAtNode(active_container);
                        utils_6.default.dom.remove(active_container);
                        this.active = null;
                        return;
                    }
                    if (!source) {
                        return;
                    }
                    var uuid = source.uuid, delegate = source.delegate, source_container = source.container;
                    // Add the active modifier class to the grid item for styling
                    utils_6.default.dom.classes.add(source_container, exports.CLASSES["WALL_ACTIVE_MODIFIER"]);
                    var _c = source_container.getBoundingClientRect(), width = _c.width, height = _c.height, top = _c.top, left = _c.left, right = _c.right;
                    var destination = viewports.left;
                    var from_right = left + width > vw * 0.5;
                    var from_bottom = top + height > vh * 0.5;
                    var style = {
                        "position": "absolute",
                        "top": top + height + "px",
                        "left": left + width + "px",
                        "minWidth": width + "px",
                        "minHeight": height + "px"
                    };
                    if (from_right && !from_bottom) {
                        style = __assign({}, style, { left: null, right: vw - (right - width) + "px" });
                    }
                    else if (from_bottom && !from_right) {
                        destination = viewports.right;
                        style = __assign({}, style, { left: "-" + (vw - right) + "px", top: null, bottom: vh - top + "px" });
                    }
                    else if (from_bottom && from_right) {
                        destination = viewports.right;
                        style = __assign({}, style, { left: null, top: null, bottom: vh - top + "px", right: vw - (right - width) + "px" });
                    }
                    // Create container & render into
                    var container = utils_6.default.dom.create("div", style, [exports.CLASSES["WALL_HIGHLIGHT_ITEM"]]);
                    ReactDOM.render(React.createElement(Card, { item: delegate.item }), container);
                    destination.appendChild(container);
                    this.active = { container: container, uuid: uuid, delegate: delegate };
                },
                enumerable: true,
                configurable: true
            });
            /* After having loaded in all of the items, the wall component will iterate over each, calling this function which
             * is expected to render an instance of our composed grid item and providing an "ItemDelegate" to each.
             *
             * It also returns a unique identifier that the wall can use to trigger highlights outside the events bound during
             * this function (mouseover mouseout).
             */
            Renderer.prototype.add = function (delegate, style) {
                var _a = this, rendered = _a.rendered, viewports = _a.viewports;
                var uuid = utils_6.default.uuid();
                // Create the div to contain the item and the instance of the grid item itself
                var container = utils_6.default.dom.create("div", style, [exports.CLASSES["WALL_ITEM"]]);
                var instance = React.createElement(GridItem, { delegate: delegate, uuid: uuid });
                // Render the "grid item" into the container we've just created
                ReactDOM.render(instance, container);
                // Add the container (which has now had a component rendered into it) into the viewport
                viewports.list.appendChild(container);
                // Add the created information to our list of items
                rendered.push({ delegate: delegate, container: container, uuid: uuid });
                return uuid;
            };
            Renderer.prototype.seal = function () {
                var viewports = this.viewports;
                this.clearfix = utils_6.default.dom.create("div", { clear: "both" }, [exports.CLASSES["WALL_CLEARFIX"]]);
                viewports.list.appendChild(this.clearfix);
            };
            Renderer.prototype.find = function (rendered_id) {
                var rendered = this.rendered;
                for (var i = 0, c = rendered.length; i < c; i++) {
                    var item = rendered[i];
                    if (item.uuid === rendered_id)
                        return item;
                }
                return null;
            };
            Renderer.prototype.clear = function () {
                var _a = this, viewports = _a.viewports, rendered = _a.rendered, clearfix = _a.clearfix;
                if (clearfix) {
                    utils_6.default.dom.remove(clearfix);
                }
                this.clearfix = null;
                while (rendered.length) {
                    var container = rendered.shift().container;
                    ReactDOM.unmountComponentAtNode(container);
                    utils_6.default.dom.remove(container);
                }
                this.highlight = null;
                viewports.list.innerHTML = "";
            };
            return Renderer;
        }());
        var Wall = (function (_super) {
            __extends(Wall, _super);
            function Wall(props) {
                var _this = _super.call(this, props) || this;
                // Create the state & prepare a store for subscriptions
                _this.state = {};
                _this.subscriptions = {};
                var delegate = props.delegate;
                var launch = function () {
                    var _a = _this, subscriptions = _a.subscriptions, timings = _a.timings;
                    // If we've been unmounted, do nothing!
                    if (!subscriptions["fullscreen:change"]) {
                        return;
                    }
                    var interval = typeof delegate.interval === "function" ? delegate.interval() : exports.CYCLE_INTERVAL;
                    timings.interval(cycle, _this, interval);
                    _this.setState({ opening: false, fullscreen: true });
                };
                /* Listen to the window for changes to the currently fullcreen-ed element and make sure to update the state of
                 * this instance when we notice it has been closed (we think open but no current on fullscreen).
                 */
                var fullscreen_change = function (event, errored) {
                    if (errored === void 0) {
                        errored = false;
                    }
                    var _a = _this, state = _a.state, timings = _a.timings, subscriptions = _a.subscriptions;
                    if (state.fullscreen === true && window_3.default.fullscreen.current) {
                        return;
                    }
                    if (!subscriptions["fullscreen:change"] || !subscriptions["fullscreen:error"]) {
                        return;
                    }
                    var renderer = _this.renderer;
                    if (renderer) {
                        renderer.clear();
                    }
                    timings.stop();
                    // If we received a fullscreen change event but am not in the middle of opening, do essentially nothing.
                    if (!state.opening) {
                        return _this.setState({ opening: false, fullscreen: false });
                    }
                    // If we're being called due to an error, keep track of it on the state
                    state.fullscreen_error = errored ? event : null;
                    timings.enqueue(launch, _this, typeof delegate.delay === "function" ? delegate.delay() : exports.FULLSCREEN_DELAY);
                };
                var fullscreen_error = function (event) {
                    var opening = _this.state.opening;
                    if (!opening) {
                        return;
                    }
                    return fullscreen_change(event, true);
                };
                // Listen to full screen changes.
                _this.subscriptions["fullscreen:change"] = window_3.default.on("fullscreenchange", fullscreen_change);
                _this.subscriptions["fullscreen:error"] = window_3.default.on("fullscreenerror", fullscreen_error);
                _this.timings = new TransitionTimings();
                _this.renderers = [];
                _this.uuid_pool = [];
                return _this;
            }
            Object.defineProperty(Wall.prototype, "renderer", {
                get: function () {
                    var renderers = this.renderers;
                    var latest = renderers[0];
                    return latest;
                },
                enumerable: true,
                configurable: true
            });
            Wall.prototype.componentWillUnmount = function () {
                var _a = this, subscriptions = _a.subscriptions, timings = _a.timings, renderer = _a.renderer;
                renderer.clear();
                timings.stop();
                for (var key in subscriptions) {
                    var id = subscriptions[key];
                    window_3.default.off(id);
                    delete subscriptions[key];
                }
            };
            /* Called for every cycle interval as well as mouse interactions (on/off) on the grid items, this function is
             * responsible for opening the highlight view of the component.
             */
            Wall.prototype.highlight = function (rendered_id, user_event) {
                if (user_event === void 0) {
                    user_event = false;
                }
                var _a = this, state = _a.state, timings = _a.timings, renderer = _a.renderer, props = _a.props;
                var delegate = props.delegate;
                var source = rendered_id === null ? null : renderer.find(rendered_id);
                var current = renderer.highlight;
                // If we were unable to find the target to highlight, exit now.
                if (!source) {
                    return renderer.highlight = null;
                }
                function close() {
                    renderer.highlight = null;
                }
                function open() {
                    // Clear out the existing highlight
                    renderer.highlight = null;
                    // Set the new one to our target
                    renderer.highlight = rendered_id;
                }
                // Do nothing if we're not in full screen and there is nothing to open/close
                if (state.fullscreen !== true || (source === null && current === null)) {
                    return;
                }
                /* If we were given a null item target and we currently have an active item, the caller is letting us know that
                 * the highlighted item should no longer be highlighted - enqueue the close action.
                 */
                if (source === null && current !== null) {
                    return timings.enqueue(close, this);
                }
                // Clear out whatever we're about to do
                timings.enqueue(null, null);
                // If we have nothing to do because the target and the current highlight are the same, move on.
                if (current && current === rendered_id) {
                    return;
                }
                /* If we have a valid target enqueue the "open" action with a delay in the event we have an existing highlight,
                 * or immediately if there is no existing highlight.
                 */
                var delay = current === null ? 0 : (typeof delegate.delay === "function" ? delegate.delay() : exports.DEBOUNCEMENT);
                timings.enqueue(open, this, delay);
            };
            /* Called once the delegate has loaded in it's items, this function handles iterating over the items, calculating
             * the positions for each and then rendering them onto the dom via it's active "renderer".
             */
            Wall.prototype.transclude = function (items) {
                var _this = this;
                var _a = this, timings = _a.timings, renderer = _a.renderer, state = _a.state, uuid_pool = _a.uuid_pool;
                var _b = renderer.size, width = _b.width, height = _b.height;
                var fullscreen = state.fullscreen;
                // If there are no items, do nothing else
                if (items.length === 0) {
                    return;
                }
                var highlight = function (rendered_id) {
                    // If we're coming off an element, restart our cycle
                    if (rendered_id === null) {
                        timings.interval(cycle, _this, exports.CYCLE_INTERVAL);
                        return _this.highlight(rendered_id);
                    }
                    // If we're coming onto an element, stop the cycle and highlight the item
                    timings.stop();
                    _this.highlight(rendered_id, true);
                };
                // Prepare some information with which we will calculate positions
                var columns = Math.min(exports.MAX_COLUMNS, items.length);
                var aspect = fullscreen ? width / (height || width) : 1.0;
                var rows = Math.round(columns * (1 / aspect));
                var box_width = Math.floor(width / columns);
                var box_height = fullscreen ? Math.floor(height / rows) : box_width;
                for (var i = 0, c = items.length; i < c; i++) {
                    var item = items[i];
                    // Position it
                    var style = {
                        "position": "relative",
                        "float": "left",
                        "width": box_width + "px",
                        "height": box_height + "px"
                    };
                    var item_delegate = new ItemDelegate(item, highlight);
                    var uuid = renderer.add(item_delegate, style);
                    uuid_pool.push(uuid);
                }
                renderer.seal();
            };
            Wall.prototype.render = function () {
                var _this = this;
                var _a = this, props = _a.props, renderers = _a.renderers, state = _a.state, refs = _a.refs, uuid_pool = _a.uuid_pool;
                var delegate = props.delegate;
                var transclude = this.transclude.bind(this);
                var toggle = React.createElement("a", { className: exports.CLASSES["WALL_CONTROL_OUT"], onClick: close }, "exit");
                var styles = {};
                /* Called as a react `ref` hook, this function will clear out the previous renderer instance (the class
                 * responsible for actually rendering transclusions into the dom), and replace it with a new instance before
                 * attempting to load in the delegate's items via the `items` hook.
                 */
                function load(list_el) {
                    var latest = renderers[0];
                    var left = refs["left"];
                    var right = refs["right"];
                    // If for some reason our reference element was not found, skip it.
                    if (!list_el) {
                        return null;
                    }
                    // If we previously had a renderer, clear it and remove it
                    if (latest) {
                        latest.clear();
                        renderers.shift();
                    }
                    var renderer = new Renderer(list_el, left, right);
                    renderers.push(renderer);
                    // Finally load in the delegate's items.
                    delegate.items(transclude);
                }
                function close() {
                    window_3.default.fullscreen.open(null);
                }
                var open = function () {
                    var _a = _this, current_refs = _a.refs, current_state = _a.state;
                    var wall_element = current_refs["wall"];
                    if (!wall_element) {
                        return;
                    }
                    current_state.opening = true;
                    window_3.default.fullscreen.open(wall_element);
                };
                // If we're not in full screen mode, render out our opener.
                if (state.fullscreen !== true) {
                    toggle = React.createElement("a", { className: exports.CLASSES["WALL_CONTROL_IN"], onClick: open });
                }
                /* If the component is in full screen mode, we need it to "consume" the screen using absolute positioning. The
                 * other containers will also need to be absolutely positioned so that we can place elements in a fancy way.
                 */
                if (state.fullscreen === true) {
                    styles["wall"] = { "position": "absolute", "width": "100%", "height": "100%", "left": "0", "top": "0" };
                    styles["controls"] = { "position": "absolute", "zIndex": "3" };
                    styles["left"] = { "position": "absolute", "zIndex": "2", "width": "100%", "height": "0", "left": "0%" };
                    styles["right"] = { "position": "absolute", "zIndex": "2", "width": "0", "height": "100%", "right": "0%" };
                    styles["viewport"] = {
                        "position": state.fullscreen_error ? "fixed" : "absolute",
                        "zIndex": "1",
                        "width": "100%",
                        "height": "100%"
                    };
                }
                // Clear out all references to previously rendered items.
                uuid_pool.length = 0;
                return (React.createElement("div", { className: exports.CLASSES["WALL"], style: styles["wall"], ref: "wall" }, React.createElement("div", { className: exports.CLASSES["WALL_HIGHLIGHT"], style: styles["left"], ref: "left" }), React.createElement("div", { className: exports.CLASSES["WALL_HIGHLIGHT"], style: styles["right"], ref: "right" }), React.createElement("div", { className: exports.CLASSES["WALL_CONTROLS"], style: styles["controls"] }, toggle), React.createElement("div", { className: exports.CLASSES["WALL_VIEWPORT"], style: styles["viewport"], ref: load })));
            };
            return Wall;
        }(React.Component));
        return Wall;
    }
    exports.default = WallFactory;
});
define("hoctable/hoc/grid", ["require", "exports", "hoctable/utils", "react", "react-dom", "hoctable/hoc/table"], function (require, exports, utils_7, React, ReactDOM, table_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CLASSES = {
        GRID: "hoctable__grid",
        GRID_BODY: "hoctable__grid-body",
        GRID_HEAD: "hoctable__grid-head",
        GRID_HEAD_ROW: "hoctable__grid-head-row",
        GRID_CONTAINER: "hoctable__grid-container",
        GRID_ROW_CONTAINER: "hoctable__grid-row-container",
        GRID_COLUMN_HEAD: "hoctable__grid-header-cell",
        GRID_COLUMN_HEAD_SORTABLE: "hoctable__grid-header-cell--sortable",
        GRID_COLUMN_HEAD_ACTIVE: "hoctable__grid-header-cell--active",
        GRID_COLUMN_HEAD_CONTENT: "hoctable__grid-header-cell-content",
        PAGINATION_CONTAINER: "hoctable__grid-pagination"
    };
    function ColumnFactory(Transclusion) {
        var ColumnHeader = (function (_super) {
            __extends(ColumnHeader, _super);
            function ColumnHeader(props) {
                return _super.call(this, props) || this;
            }
            ColumnHeader.prototype.sort = function () {
                var _a = this.props, sort = _a.sort, column = _a.column;
                var update = this.forceUpdate.bind(this);
                if (column.sortable !== true) {
                    return;
                }
                sort(column, update);
            };
            ColumnHeader.prototype.render = function () {
                var _a = this.props, column = _a.column, flags = _a.flags;
                var name = column.name, sortable = column.sortable, user_classes = column.classes;
                var class_list = (user_classes || []).concat(exports.CLASSES["GRID_COLUMN_HEAD"]);
                if (flags && flags.active === true) {
                    class_list.push(exports.CLASSES["GRID_COLUMN_HEAD_ACTIVE"]);
                }
                if (sortable === true) {
                    class_list.push(exports.CLASSES["GRID_COLUMN_HEAD_SORTABLE"]);
                }
                var content = React.createElement("div", { className: exports.CLASSES["GRID_COLUMN_HEAD_CONTENT"] }, React.createElement("span", null, name));
                // If there was user-provided transclusion, replace the content with a new instance of that transclusion.
                if (Transclusion) {
                    content = React.createElement(Transclusion, { sort: this.sort, column: column, flags: flags });
                }
                return React.createElement("div", { className: class_list.join(" "), onClick: this.sort.bind(this) }, content);
            };
            return ColumnHeader;
        }(React.Component));
        return ColumnHeader;
    }
    function GridFactory(Row, Column) {
        // Create the header cell by transcluding the user-provided component to our column factory
        var HeaderCell = ColumnFactory(Column);
        var PagedGrid = (function (_super) {
            __extends(PagedGrid, _super);
            function PagedGrid(props) {
                var _this = _super.call(this, props) || this;
                /* Prepare an array to hold of the html nodes that we create during our renders so that we can delete them and
                 * unmount components later.
                 */
                _this.bodies = [];
                // If initial sorting + pagination information was provided, update to align w/ that information
                _this.state = {
                    sorting: props.sorting || null,
                    pagination: props.pagination || { size: 10, current: 0, total: 0 }
                };
                return _this;
            }
            PagedGrid.prototype.componentWillUnmount = function () {
                this.render_request = null;
            };
            /* During the rendering of the table, it will attempt to assign this function to the table element's 'ref' react
             * property. Once called, this function will attempt to load in the delegate's row data via it's `rows` function
             * and subsequently iterate over each elment, rendering it into place.
             */
            PagedGrid.prototype.transclude = function (table) {
                var _this = this;
                var _a = this, props = _a.props, bodies = _a.bodies, refs = _a.refs, state = _a.state;
                var sorting = state.sorting, pagination = state.pagination;
                var delegate = props.delegate;
                if (!table) {
                    return;
                }
                var pagination_props = { pagination: pagination, move: this.move.bind(this) };
                var current_request = this.render_request = utils_7.default.uuid();
                var render = function (data) {
                    var rows = data.rows, total = data.total;
                    var render_request = _this.render_request;
                    // Prevent rendering if not latest.
                    if (render_request !== current_request) {
                        return;
                    }
                    // Remove the previous pagination component.
                    var pager = refs["pager"];
                    ReactDOM.unmountComponentAtNode(pager);
                    // Cleanup previous tbody elements.
                    while (bodies.length) {
                        var next = bodies.splice(0, 1)[0];
                        ReactDOM.unmountComponentAtNode(next);
                        utils_7.default.dom.remove(next);
                    }
                    /* Iterate over the row data, creating a <tbody> container for them and rendering a new instance of the `Row`
                     * transclusion into it; preserving the strict html table hierachy rules.
                     */
                    for (var i = 0, c = rows.length; i < c; i++) {
                        var row = rows[i];
                        var body = utils_7.default.dom.create("article", null, [exports.CLASSES["GRID_ROW_CONTAINER"]]);
                        ReactDOM.render(React.createElement(Row, { row: row }), body);
                        table.appendChild(body);
                        bodies.push(body);
                    }
                    // Update our pagination's reference to the total amount of data (as returned by the delegate)
                    pagination.total = total;
                    // Render the pagination component
                    ReactDOM.render(React.createElement(table_1.Pagination, __assign({}, pagination_props)), pager);
                };
                // Start the data source loading
                delegate.rows(pagination, sorting, render);
            };
            PagedGrid.prototype.move = function (new_page, done) {
                var state = this.state;
                var pagination = __assign({}, state.pagination, { current: new_page });
                this.setState({ pagination: pagination });
                done();
            };
            PagedGrid.prototype.sort = function (column, done) {
                var rel = column.rel;
                var sorting = this.state.sorting;
                var direction = (sorting || { direction: false }).direction;
                if (sorting && sorting.rel === rel) {
                    direction = !direction;
                }
                sorting = { rel: rel, direction: direction };
                this.setState({ sorting: sorting });
                done();
            };
            PagedGrid.prototype.render = function () {
                var sorting = this.state.sorting;
                var delegate = this.props.delegate;
                var column_headers = [];
                /* Ask the delegate for it's columns and iterate over each, creating a table header cell and a colgroup <col />
                 * element in order to keep the body's column width equal to that of the header's.
                 */
                for (var i = 0, columns = delegate.columns(), c = columns.length; i < c; i++) {
                    var column = columns[i];
                    var active = sorting && column.rel === sorting.rel;
                    var flags = { active: active };
                    // Create and insert the column (which may itself have a transclusion).
                    column_headers.push(React.createElement(HeaderCell, { column: column, key: column.rel, sort: this.sort.bind(this), flags: flags }));
                }
                return (React.createElement("main", { className: exports.CLASSES["GRID"] }, React.createElement("nav", { className: exports.CLASSES["PAGINATION_CONTAINER"], ref: "pager" }), React.createElement("section", { className: exports.CLASSES["GRID_CONTAINER"] }, React.createElement("section", { className: exports.CLASSES["GRID_HEAD"] }, React.createElement("article", { className: exports.CLASSES["GRID_HEAD_ROW"] }, column_headers)), React.createElement("section", { className: exports.CLASSES["GRID_BODY"], ref: this.transclude.bind(this) }))));
            };
            return PagedGrid;
        }(React.Component));
        return PagedGrid;
    }
    exports.default = GridFactory;
});
define("hoctable/hoc/multi_select", ["require", "exports", "hoctable/hoc/menu", "hoctable/hoc/select", "hoctable/utils", "react", "react-dom"], function (require, exports, menu_2, select_1, utils_8, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEBOUNCE_TIME = 30;
    exports.CLASSES = {
        MULTISELECT_ITEM: "hoctable__multiselect-item",
        MULTISELECT_ITEM_LIST: "hoctable__multiselect-item-list",
        MULTISELECT_ITEM_TOGGLE: "hoctable__multiselect-item-toggle",
        MULTISELECT_ITEM_TEXT: "hoctable__multiselect-item-text",
        MULTISELECT_SEARCH: "hoctable__multiselect-search",
        MULTISELECT_SEARCH_CONTAINER: "hoctable__multiselect-search-box",
        MULTISELECT: "hoctable__multiselect"
    };
    function ItemFactory(Inner) {
        var Item = (function (_super) {
            __extends(Item, _super);
            function Item() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Item.prototype.render = function () {
                var props = this.props;
                var delegate = props.delegate, option = props.option, signals = props.signals;
                var selected = delegate.isSelected(option);
                var finished = function (remain_open) {
                    signals.selection(remain_open);
                };
                var select = function () {
                    return delegate.toggle(option, finished);
                };
                if (Inner) {
                    var content = React.createElement(Inner, __assign({}, props));
                    return (React.createElement("div", { className: exports.CLASSES["MULTISELECT_ITEM"], onClick: select }, content));
                }
                return (React.createElement("div", { className: exports.CLASSES["MULTISELECT_ITEM"] }, React.createElement("div", { className: exports.CLASSES["MULTISELECT_ITEM_TOGGLE"] }, React.createElement("input", { type: "checkbox", onChange: select, checked: selected })), React.createElement("div", { className: exports.CLASSES["MULTISELECT_ITEM_TEXT"] }, React.createElement("p", null, delegate.translate("option", option)))));
            };
            return Item;
        }(React.Component));
        return Item;
    }
    function DefaultSearch(props) {
        var value = props.value, search = props.search, delegate = props.delegate;
        return (React.createElement("div", { className: exports.CLASSES["MULTISELECT_SEARCH"] }, React.createElement("input", { type: "text", value: value || "", placeholder: delegate.translate("placeholder"), onChange: search })));
    }
    exports.DefaultSearch = DefaultSearch;
    function Factory(Item, ButtonComponent, Search) {
        if (ButtonComponent === void 0) {
            ButtonComponent = select_1.DefaultButton;
        }
        if (Search === void 0) {
            Search = DefaultSearch;
        }
        var ComposedItem = ItemFactory(Item);
        var MultiSelect = (function (_super) {
            __extends(MultiSelect, _super);
            function MultiSelect(props) {
                var _this = _super.call(this, props) || this;
                _this.options = [];
                _this.state = {};
                return _this;
            }
            MultiSelect.prototype.componentWillUnmount = function () {
                this.render_request = null;
                this.search_timeout = null;
            };
            MultiSelect.prototype.transclude = function (list_el) {
                var _this = this;
                var _a = this, options = _a.options, state = _a.state, props = _a.props;
                var delegate = props.delegate;
                if (!list_el) {
                    return;
                }
                var selection = function () {
                    _this.setState({ updated: Date.now() });
                };
                var signals = { selection: selection };
                var current_request = this.render_request = utils_8.default.uuid();
                var render = function (option_list) {
                    var render_request = _this.render_request;
                    // Prevent bad rendering.
                    if (render_request !== current_request) {
                        return;
                    }
                    // Cleanup previously rendered options
                    while (options.length) {
                        var next = options.splice(0, 1)[0];
                        ReactDOM.unmountComponentAtNode(next);
                        utils_8.default.dom.remove(next);
                    }
                    /* Iterate over the options returned by the delegate, rendering them into the list element reference provided
                     * by react during the `ref` callback.
                     */
                    for (var i = 0, c = option_list.length; i < c; i++) {
                        var option = option_list[i];
                        var body = document.createElement("div");
                        ReactDOM.render(React.createElement(ComposedItem, { delegate: delegate, option: option, signals: signals }), body);
                        list_el.appendChild(body);
                        options.push(body);
                    }
                };
                var params = { query: state.query };
                delegate.options(params, render);
            };
            MultiSelect.prototype.search = function (event) {
                var _this = this;
                var target = event.target;
                var query = target.value;
                var current_timeout = null;
                var update = function () {
                    var search_timeout = _this.search_timeout;
                    if (search_timeout !== current_timeout) {
                        return;
                    }
                    _this.setState({ query: query });
                };
                if (this.search_timeout) {
                    clearTimeout(this.search_timeout);
                }
                current_timeout = setTimeout(update, exports.DEBOUNCE_TIME);
                this.search_timeout = current_timeout;
            };
            MultiSelect.prototype.render = function () {
                var _a = this, props = _a.props, state = _a.state;
                var search = null;
                if (Search !== null) {
                    var search_props = { value: state.query, delegate: props.delegate };
                    search = (React.createElement(Search, __assign({}, search_props, { search: this.search.bind(this) })));
                }
                return (React.createElement("div", { className: exports.CLASSES["MULTISELECT"] }, React.createElement("div", { className: exports.CLASSES["MULTISELECT_SEARCH_CONTAINER"] }, search), React.createElement("div", { className: exports.CLASSES["MULTISELECT_ITEM_LIST"], ref: this.transclude.bind(this) })));
            };
            return MultiSelect;
        }(React.Component));
        return menu_2.default(MultiSelect, ButtonComponent);
    }
    exports.default = Factory;
});
define("hoctable", ["require", "exports", "hoctable/hoc/table", "hoctable/hoc/select", "hoctable/hoc/search", "hoctable/hoc/menu", "hoctable/hoc/wall", "hoctable/hoc/grid", "hoctable/hoc/multi_select", "hoctable/services/popups", "hoctable/services/window", "hoctable/utils"], function (require, exports, table_2, select_2, search_1, menu_3, wall_1, grid_1, multi_select_1, popups_3, window_4, utils_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.utils = utils_9.default;
    var hoc = {
        Grid: grid_1.default,
        Menu: menu_3.default,
        MultiSelect: multi_select_1.default,
        Select: select_2.default,
        Search: search_1.default,
        Table: table_2.default,
        Wall: wall_1.default
    };
    exports.hoc = hoc;
    var services = { Popups: popups_3.default, Viewport: window_4.default };
    exports.services = services;
});
//# sourceMappingURL=hoctable.js.map 
define("example/ghp/js/delegates/menus/cuisines", ["require", "exports", "example/ghp/js/services/zomato", "example/ghp/js/services/i18n"], function (require, exports, zomato_4, i18n_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function lower(s) { return s.toLowerCase(); }
    var Delegate = /** @class */ (function () {
        function Delegate(api_credentials, filters) {
            this.client = new zomato_4.default(api_credentials);
            this.filters = filters;
            this.cache = [];
        }
        Delegate.prototype.isSelected = function (item) {
            var cuisine = item.cuisine;
            var filters = this.filters.latest;
            return (filters.cuisines || []).some(function (_a) {
                var cuisine_id = _a.cuisine_id;
                return cuisine_id === cuisine.cuisine_id;
            });
        };
        Delegate.prototype.text = function () {
            var filters = this.filters.latest;
            var cuisines = filters.cuisines;
            return cuisines && cuisines.length >= 1 ? i18n_8.default("selected") + " (" + cuisines.length + ")" : i18n_8.default("all_cuisines");
        };
        Delegate.prototype.options = function (params, callback) {
            var _a = this, client = _a.client, filters = _a.filters, cache = _a.cache;
            var query = params.query;
            var city = filters.latest.city;
            function filter(_a) {
                var cuisine = _a.cuisine;
                var cuisine_name = cuisine.cuisine_name;
                return lower(cuisine_name).indexOf(query) !== -1;
            }
            function loaded(_a) {
                var cuisines = _a.cuisines;
                var warm = cache.warm;
                if (!warm) {
                    cache.splice.apply(cache, [0, 0].concat(cuisines));
                    cache.warm = true;
                }
                var filtered = (query ? cuisines.filter(filter) : cuisines).slice(0, 15);
                if (filtered.length === 0) {
                    return callback([{ empty: true }]);
                }
                callback(filtered);
            }
            if (cache.warm) {
                return loaded({ cuisines: cache });
            }
            function failed(error) {
                console.error(error);
                var options = [{ error: error }];
                callback(options);
            }
            client.cuisines(city.id, query, { count: 5 }).then(loaded).catch(failed);
        };
        Delegate.prototype.translate = function (identifier, item) {
            switch (identifier) {
                case "option":
                    return item.empty ? i18n_8.default("no_results") : (item.cuisine ? item.cuisine.cuisine_name : i18n_8.default("unknown"));
                case "placeholder":
                    return i18n_8.default("search");
                default:
                    return "";
            }
        };
        Delegate.prototype.toggle = function (option, done) {
            var filters = this.filters;
            var latest = filters.latest;
            var cuisines = latest.cuisines;
            var cuisine = option.cuisine;
            if (!cuisines || cuisines.length === 0) {
                filters.dispatch({ field: "cuisines", value: [cuisine] });
                return done();
            }
            // Clear out the previous list of cities from our filter.
            var new_list = latest.cuisines.filter(function (_a) {
                var cuisine_id = _a.cuisine_id;
                return cuisine_id !== cuisine.cuisine_id;
            });
            // If the filtered list was the same as it was, add the new city, otherwise use the filtered on.
            var value = new_list.length === latest.cuisines.length ? [cuisine].concat(new_list) : new_list;
            filters.dispatch({ field: "cuisines", value: value });
            done();
        };
        return Delegate;
    }());
    exports.default = Delegate;
});
define("example/ghp/js/components/app_nav", ["require", "exports", "example/ghp/js/services/i18n", "example/ghp/js/services/links", "example/ghp/js/router"], function (require, exports, i18n_9, links_2, router_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function AppNav() {
        var active_route = router_2.default.active;
        var path = active_route.path;
        return (React.createElement("div", { className: "tabs" },
            React.createElement("ul", null,
                React.createElement("li", { className: path === "movies" ? "is-active" : "inactive" },
                    React.createElement("a", { href: links_2.default("movies") }, i18n_9.default("movies"))),
                React.createElement("li", { className: path === "restaurants" ? "is-active" : "inactive" },
                    React.createElement("a", { href: links_2.default("restaurants") }, i18n_9.default("restaurants"))))));
    }
    exports.default = AppNav;
});
define("example/ghp/js/components/movies/table", ["require", "exports", "hoctable", "example/ghp/js/services/i18n"], function (require, exports, hoctable, i18n_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RELEASE_FORMAT = "MMM Do YYYY";
    function emptyRow() {
        return (React.createElement("tr", { className: "movie-row movie-row--empty" },
            React.createElement("td", { colSpan: "7" }, i18n_10.default("no_results"))));
    }
    var Row = /** @class */ (function (_super) {
        __extends(Row, _super);
        function Row(props) {
            return _super.call(this, props) || this;
        }
        Row.prototype.render = function () {
            var row = this.props.row;
            var movie = row.movie, empty = row.empty;
            if (empty === true)
                return emptyRow();
            var released = moment(movie.release_date).format(RELEASE_FORMAT);
            return (React.createElement("tr", { className: "movie-row" },
                React.createElement("td", { className: "move-row__id" },
                    React.createElement("p", null, movie["const"])),
                React.createElement("td", { className: "move-row__title" },
                    React.createElement("p", null, movie.title)),
                React.createElement("td", { className: "move-row__release" },
                    React.createElement("p", null, released)),
                React.createElement("td", { className: "move-row__runtime" },
                    React.createElement("p", null, movie.runtime)),
                React.createElement("td", { className: "move-row__directors" },
                    React.createElement("p", null, movie.directors)),
                React.createElement("td", { className: "move-row__genres" },
                    React.createElement("p", null, movie.genres)),
                React.createElement("td", { className: "move-row__rating" },
                    React.createElement("p", null, movie.imdb_rating))));
        };
        return Row;
    }(React.Component));
    exports.default = hoctable.hoc.Table(Row);
});
define("example/ghp/js/components/restaurants/table", ["require", "exports", "hoctable", "example/ghp/js/services/i18n"], function (require, exports, hoctable_1, i18n_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function errorRow() {
        return (React.createElement("tr", null,
            React.createElement("td", { colSpan: "3" },
                React.createElement("p", null, i18n_11.default("something_went_wrong")))));
    }
    function emptyRow() {
        return (React.createElement("tr", null,
            React.createElement("td", { colSpan: "3" },
                React.createElement("p", null, i18n_11.default("no_results")))));
    }
    var RestaurantRow = /** @class */ (function (_super) {
        __extends(RestaurantRow, _super);
        function RestaurantRow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RestaurantRow.prototype.render = function () {
            var restaurant = this.props.restaurant;
            var loc = restaurant.location, rating = restaurant.user_rating;
            return (React.createElement("tr", null,
                React.createElement("td", { className: "restaurant-name" },
                    React.createElement("p", null, restaurant.name)),
                React.createElement("td", { className: "restaurant-location" },
                    React.createElement("div", { className: "street" },
                        React.createElement("p", null, loc ? loc.address : null))),
                React.createElement("td", { className: "restaurant-rating" },
                    React.createElement("p", null, rating ? rating.aggregate_rating + " (" + rating.votes + ")" : null))));
        };
        return RestaurantRow;
    }(React.Component));
    var Row = /** @class */ (function (_super) {
        __extends(Row, _super);
        function Row() {
            return _super.apply(this, arguments) || this;
        }
        Row.prototype.render = function () {
            var row = this.props.row;
            if (row.empty === true) {
                return emptyRow();
            }
            if (row.error) {
                return errorRow();
            }
            return React.createElement(RestaurantRow, __assign({}, row));
        };
        return Row;
    }(React.Component));
    exports.default = hoctable_1.hoc.Table(Row);
});
define("example/ghp/js/views/about", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function About(_a) {
        var resolution = _a.resolution;
        var content = resolution.content;
        var __html = marked(content.fields.description);
        var inner_html = { __html: __html };
        return (React.createElement("div", { className: "container" },
            React.createElement("div", { className: "clearfix content", dangerouslySetInnerHTML: inner_html })));
    }
    exports.default = About;
});
define("example/ghp/js/views/movies", ["require", "exports", "hoctable", "example/ghp/js/services/i18n", "example/ghp/js/components/movies/table", "example/ghp/js/components/app_nav"], function (require, exports, hoctable, i18n_12, table_1, app_nav_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Select = hoctable.hoc.Select();
    // Movies View
    //
    // This component demonstrates an example of a react application "view" that renders out an instance of the hoctable
    // table and menu components. The delegates for these are resolved into the view by the route in order to allow url
    // based initial state preparation.
    var Movies = /** @class */ (function (_super) {
        __extends(Movies, _super);
        function Movies(props) {
            var _this = _super.call(this, props) || this;
            var filters = props.resolution.filters;
            var update = _this.forceUpdate.bind(_this);
            _this.subscriptions = {
                filters: filters.subscribe(update)
            };
            return _this;
        }
        Movies.prototype.componentWillUnmount = function () {
            var _a = this, subscriptions = _a.subscriptions, props = _a.props;
            var filters = props.resolution.filters;
            filters.unsubscribe(subscriptions.filters);
        };
        Movies.prototype.search = function (_a) {
            var target = _a.target;
            var resolution = this.props.resolution;
            var table_delegate = resolution.table_delegate, filters = resolution.filters;
            var value = target.value;
            filters.dispatch({ field: "title", value: value });
        };
        Movies.prototype.render = function () {
            var resolution = this.props.resolution;
            var table_delegate = resolution.table_delegate, genre_delegate = resolution.genre_delegate, filters = resolution.filters;
            return (React.createElement("main", { className: "index-page" },
                React.createElement("section", { className: "container margin-bottom-30" },
                    React.createElement(app_nav_1.default, null)),
                React.createElement("section", { className: "container" },
                    React.createElement("div", { className: "container columns" },
                        React.createElement("div", { className: "column is-one-quarter" },
                            React.createElement("input", { type: "text", placeholder: i18n_12.default("search_titles"), onChange: this.search.bind(this) })),
                        React.createElement("div", { className: "column is-one-quarter" },
                            React.createElement("div", { className: "float-left" },
                                React.createElement(Select, { delegate: genre_delegate })))),
                    React.createElement("hr", null),
                    React.createElement(table_1.default, { delegate: table_delegate }))));
        };
        return Movies;
    }(React.Component));
    exports.default = Movies;
});
define("example/ghp/js/views/restaurants", ["require", "exports", "hoctable", "example/ghp/js/services/i18n", "example/ghp/js/components/app_nav", "example/ghp/js/components/restaurants/table", "example/ghp/js/delegates/menus/cuisines"], function (require, exports, hoctable_2, i18n_13, app_nav_2, table_2, cuisines_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Select = hoctable_2.hoc.Select();
    var MultiSelect = hoctable_2.hoc.MultiSelect();
    var Search = hoctable_2.hoc.Search();
    var Restaurants = /** @class */ (function (_super) {
        __extends(Restaurants, _super);
        function Restaurants(props) {
            var _this = _super.apply(this, arguments) || this;
            var filters = props.resolution.filters;
            var update = function () {
                if (!_this.subscriptions.filters)
                    return;
                _this.setState({ updated: Date.now() });
            };
            _this.subscriptions = {
                filters: filters.subscribe(update)
            };
            return _this;
        }
        Restaurants.prototype.componentWillUnmount = function () {
            var _a = this, subscriptions = _a.subscriptions, props = _a.props;
            var filters = props.resolution.filters;
            filters.unsubscribe(subscriptions.filters);
            delete subscriptions.filters;
        };
        Restaurants.prototype.componentWillMount = function () {
            var geolocation = window.navigator.geolocation;
            var filters = this.props.resolution.filters;
            if (!geolocation) {
                return false;
            }
            function success(position) {
                var coords = position.coords;
                if (!coords) {
                    return;
                }
                filters.dispatch({ field: "location", value: coords });
            }
            function error(e) {
                console.error(e);
            }
            geolocation.getCurrentPosition(success, error);
        };
        Restaurants.prototype.search = function (_a) {
            var target = _a.target;
            var resolution = this.props.resolution;
            var table_delegate = resolution.table_delegate, filters = resolution.filters;
            var value = target.value;
            if (this.throttle) {
                clearTimeout(this.throttle);
            }
            function run() {
                filters.dispatch({ field: "title", value: value });
            }
            this.throttle = setTimeout(run, 300);
        };
        Restaurants.prototype.render = function () {
            var props = this.props;
            var resolution = props.resolution;
            var api_credentials = resolution.api_credentials, filters = resolution.filters;
            var controls = [(React.createElement("div", { className: "float-left", key: "categories" },
                    React.createElement(Select, { delegate: props.resolution.category_delegate }))), (React.createElement("div", { className: "float-left margin-left-10", key: "cities" },
                    React.createElement(Search, { delegate: props.resolution.city_delegate })))];
            if (filters.latest.city) {
                var cuisine_delegate = new cuisines_1.default(api_credentials, filters);
                var cuisine_control = (React.createElement("div", { className: "float-left margin-left-10", key: "cuisines" },
                    React.createElement(MultiSelect, { delegate: cuisine_delegate })));
                controls.push(cuisine_control);
            }
            return (React.createElement("main", null,
                React.createElement("section", { className: "container margin-bottom-30" },
                    React.createElement(app_nav_2.default, null)),
                React.createElement("section", { className: "container" },
                    React.createElement("div", { className: "margin-bottom-20 clearfix columns" },
                        React.createElement("div", { className: "column is-one-quarter is-paddingless-tb" },
                            React.createElement("input", { type: "text", placeholder: i18n_13.default("search_restaurants"), onChange: this.search.bind(this) })),
                        React.createElement("div", { className: "float-left clearfix margin-left-10" }, controls)),
                    React.createElement(table_2.default, { delegate: props.resolution.table_delegate })),
                React.createElement("hr", null),
                React.createElement("section", { className: "container" },
                    React.createElement("div", { className: "powered-by media" },
                        React.createElement("div", { className: "level-left margin-right-20" },
                            React.createElement("p", null, i18n_13.default("powered_by"))),
                        React.createElement("div", { className: "level-left" },
                            React.createElement("a", { href: "https://developers.zomato.com", rel: "noopener" },
                                React.createElement("img", { src: "//b.zmtcdn.com/images/logo/zomato_logo.svg", height: "120", width: "120px" })))))));
        };
        return Restaurants;
    }(React.Component));
    exports.default = Restaurants;
});
//# sourceMappingURL=app.js.map