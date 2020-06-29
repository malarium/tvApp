;(function (t) {
	function e(e) {
		for (
			var n, o, c = e[0], i = e[1], l = e[2], d = 0, f = [];
			d < c.length;
			d++
		)
			(o = c[d]),
				Object.prototype.hasOwnProperty.call(r, o) && r[o] && f.push(r[o][0]),
				(r[o] = 0)
		for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
		u && u(e)
		while (f.length) f.shift()()
		return s.push.apply(s, l || []), a()
	}
	function a() {
		for (var t, e = 0; e < s.length; e++) {
			for (var a = s[e], n = !0, c = 1; c < a.length; c++) {
				var i = a[c]
				0 !== r[i] && (n = !1)
			}
			n && (s.splice(e--, 1), (t = o((o.s = a[0]))))
		}
		return t
	}
	var n = {},
		r = { app: 0 },
		s = []
	function o(e) {
		if (n[e]) return n[e].exports
		var a = (n[e] = { i: e, l: !1, exports: {} })
		return t[e].call(a.exports, a, a.exports, o), (a.l = !0), a.exports
	}
	;(o.m = t),
		(o.c = n),
		(o.d = function (t, e, a) {
			o.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: a })
		}),
		(o.r = function (t) {
			'undefined' !== typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
				Object.defineProperty(t, '__esModule', { value: !0 })
		}),
		(o.t = function (t, e) {
			if ((1 & e && (t = o(t)), 8 & e)) return t
			if (4 & e && 'object' === typeof t && t && t.__esModule) return t
			var a = Object.create(null)
			if (
				(o.r(a),
				Object.defineProperty(a, 'default', { enumerable: !0, value: t }),
				2 & e && 'string' != typeof t)
			)
				for (var n in t)
					o.d(
						a,
						n,
						function (e) {
							return t[e]
						}.bind(null, n)
					)
			return a
		}),
		(o.n = function (t) {
			var e =
				t && t.__esModule
					? function () {
							return t['default']
					  }
					: function () {
							return t
					  }
			return o.d(e, 'a', e), e
		}),
		(o.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e)
		}),
		(o.p = '/')
	var c = (window['webpackJsonp'] = window['webpackJsonp'] || []),
		i = c.push.bind(c)
	;(c.push = e), (c = c.slice())
	for (var l = 0; l < c.length; l++) e(c[l])
	var u = i
	s.push([0, 'chunk-vendors']), a()
})({
	0: function (t, e, a) {
		t.exports = a('56d7')
	},
	'54e1': function (t, e, a) {},
	'56d7': function (t, e, a) {
		'use strict'
		a.r(e)
		a('e260'), a('e6cf'), a('cca6'), a('a79d')
		var n = a('2b0e'),
			r = function () {
				var t = this,
					e = t.$createElement,
					n = t._self._c || e
				return n(
					'div',
					{ attrs: { id: 'app' } },
					[
						n('img', {
							staticClass: 'logo',
							attrs: { alt: 'tv app logo', src: a('befb') },
						}),
						n('Heading'),
						n('Search', { on: { searchCommenced: t.searchCommenced } }),
						n('Modal', { attrs: { modalData: t.singleShow } }),
						n('Tiles', {
							attrs: { shows: t.showsAll },
							on: { openModal: t.openModal },
						}),
					],
					1
				)
			},
			s = [],
			o = (a('d3b7'), a('2909')),
			c = function () {
				var t = this,
					e = t.$createElement
				t._self._c
				return t._m(0)
			},
			i = [
				function () {
					var t = this,
						e = t.$createElement,
						a = t._self._c || e
					return a('div', { staticClass: 'hello' }, [a('h1', [t._v('TVApp')])])
				},
			],
			l = { name: 'Heading' },
			u = l,
			d = (a('f90e'), a('2877')),
			f = Object(d['a'])(u, c, i, !1, null, '47ab1088', null),
			h = f.exports,
			m = function () {
				var t = this,
					e = t.$createElement,
					a = t._self._c || e
				return a('div', { staticClass: 'hello' }, [
					a('input', {
						attrs: {
							type: 'text',
							minlength: '3',
							placeholder: 'enter show title',
						},
						on: {
							keyup: function (e) {
								return t.runCheck(e.target.value)
							},
						},
					}),
				])
			},
			p = [],
			b =
				(a('d81d'),
				{
					name: 'Search',
					data: function () {
						return {
							searchResults: [],
							endpointQuery: 'https://api.tvmaze.com/search/shows?q=',
						}
					},
					methods: {
						setTiles: function () {
							this.$emit('searchCommenced', this.searchResults)
						},
						setResults: function (t) {
							;(this.searchResults = []),
								(this.searchResults = t.map(function (t) {
									return t.show
								})),
								this.setTiles()
						},
						runCheck: function (t) {
							var e = this
							fetch(this.endpointQuery + t)
								.then(function (t) {
									return t.json()
								})
								.then(function (t) {
									return e.setResults(t)
								})
								.catch(function (t) {
									return e.setResults(null), t
								})
						},
					},
				}),
			v = b,
			g = (a('823d'), Object(d['a'])(v, m, p, !1, null, '6805b251', null)),
			w = g.exports,
			_ = function () {
				var t = this,
					e = t.$createElement,
					a = t._self._c || e
				return a(
					'div',
					{ staticClass: 'd-flex flex-row flex-wrap justify-content-center' },
					t._l(t.shows, function (e) {
						return a(
							'div',
							{ key: e.id, staticClass: 'p-2 card-whole' },
							[
								a(
									'b-card',
									{
										staticClass: 'mb-2 cursor-pointer',
										staticStyle: { 'max-width': '210px' },
										attrs: {
											title: e.name,
											'img-src': t.getCharacterImage(e),
											'img-alt': e.name,
											'img-top': '',
											tag: 'article',
										},
										on: {
											click: function (a) {
												return t.showMore(e.id)
											},
										},
									},
									[
										a('b-card-text', [
											a('p', [t._v('Premiered: ' + t._s(e.premiered))]),
											a('p', [
												t._v('Avg rating: ' + t._s(e.rating.average || 'none')),
											]),
										]),
									],
									1
								),
							],
							1
						)
					}),
					0
				)
			},
			C = [],
			y = {
				name: 'Tiles',
				props: ['shows'],
				watch: {
					shows: function (t, e) {
						t !== e && this.$forceUpdate()
					},
				},
				data: function () {
					return { modalData: null, castInfo: null, crewInfo: null }
				},
				methods: {
					showMore: function (t) {
						var e = this
						return fetch('https://api.tvmaze.com/shows/'.concat(t))
							.then(function (t) {
								return t.json()
							})
							.then(function (t) {
								;(e.modalData = t),
									e.$nextTick(function () {
										e.$emit('openModal', e.modalData)
									})
							})
					},
					getCharacterImage: function (t) {
						var e, a, n
						return (
							(null === t ||
							void 0 === t ||
							null === (e = t.image) ||
							void 0 === e
								? void 0
								: e.medium) ||
							(null === t ||
							void 0 === t ||
							null === (a = t.character) ||
							void 0 === a ||
							null === (n = a.image) ||
							void 0 === n
								? void 0
								: n.medium) ||
							'https://cdn.dribbble.com/users/1541938/screenshots/5315198/question-mark.png'
						)
					},
				},
			},
			x = y,
			I = (a('b2b9'), Object(d['a'])(x, _, C, !1, null, '1ece190c', null)),
			j = I.exports,
			M = function () {
				var t = this,
					e = t.$createElement,
					a = t._self._c || e
				return a(
					'div',
					[
						t.modalData
							? a(
									'b-modal',
									{
										attrs: {
											size: 'xl',
											title: '',
											'hide-footer': '',
											scrollable: '',
										},
										model: {
											value: t.openModal,
											callback: function (e) {
												t.openModal = e
											},
											expression: 'openModal',
										},
									},
									[
										a('div', { staticClass: 'container-fluid' }, [
											a('div', { staticClass: 'row' }, [
												a('div', { staticClass: 'col-12 col-md-6' }, [
													a('img', {
														staticClass: 'img-large',
														attrs: {
															src: t.getFilmPoster(t.modalData),
															alt: t.modalData.name,
														},
													}),
												]),
												a('div', { staticClass: 'col-12 col-md-6' }, [
													a(
														'div',
														{
															staticClass:
																'd-flex flex-row justify-content-between',
														},
														[
															a('h1', [t._v(t._s(t.modalData.name))]),
															a(
																'span',
																{
																	staticClass: 'align-self-center showRating',
																	class: t.classObject(),
																	attrs: {
																		'data-rating': t.modalData.rating.average,
																	},
																},
																[
																	a('b', [t._v('Rating:')]),
																	t._v(
																		' ' +
																			t._s(
																				t.modalData.rating.average || 'none'
																			) +
																			' '
																	),
																]
															),
														]
													),
													a(
														'div',
														{
															staticClass:
																'd-flex flex-row justify-content-between',
														},
														[
															a('p', { staticClass: 'align-self-center' }, [
																a('b', [t._v('Premiere:')]),
																t._v(' ' + t._s(t.modalData.premiered) + ' '),
															]),
															a('p', { staticClass: 'align-self-center' }, [
																a('b', [t._v('Language:')]),
																t._v(' ' + t._s(t.modalData.language) + ' '),
															]),
														]
													),
													a(
														'p',
														[
															a('b', [t._v('Genre:')]),
															t._l(t.modalData.genres, function (e, n) {
																return a('span', { key: e }, [
																	t._v(' ' + t._s(e) + ' '),
																	n < t.modalData.genres.length - 1
																		? a('span', [t._v('/')])
																		: t._e(),
																])
															}),
														],
														2
													),
													a('p', {
														domProps: { innerHTML: t._s(t.modalData.summary) },
													}),
													a(
														'a',
														{
															staticClass: 'mb-3 d-inline-block IMDB',
															attrs: {
																href:
																	'https://www.imdb.com/title/' +
																	t.modalData.externals.imdb,
																target: '_blank',
															},
														},
														[t._v('See at IMDb')]
													),
													a(
														'div',
														{ attrs: { role: 'tablist' } },
														[
															a(
																'b-card',
																{
																	staticClass: 'mb-1',
																	attrs: { 'no-body': '' },
																},
																[
																	a(
																		'b-card-header',
																		{
																			staticClass: 'p-1',
																			class: {
																				disabled:
																					t.castInfo && !t.castInfo.length,
																			},
																			attrs: {
																				'header-tag': 'header',
																				role: 'tab',
																			},
																		},
																		[
																			a(
																				'b-button',
																				{
																					directives: [
																						{
																							name: 'b-toggle',
																							rawName: 'v-b-toggle.accordion-1',
																							modifiers: { 'accordion-1': !0 },
																						},
																					],
																					attrs: {
																						block: '',
																						variant: 'light',
																					},
																				},
																				[
																					t.castInfo && t.castInfo.length
																						? a('span', [t._v('CAST')])
																						: a('span', [
																								t._v(
																									'CAST (no info available)'
																								),
																						  ]),
																				]
																			),
																		],
																		1
																	),
																	a(
																		'b-collapse',
																		{
																			staticClass: 'accordion-tabpanel',
																			attrs: {
																				id: 'accordion-1',
																				accordion: 'my-accordion',
																				role: 'tabpanel',
																			},
																		},
																		[
																			t.castInfo
																				? a(
																						'b-card-body',
																						{
																							staticClass:
																								'row flex-nowrap mx-0',
																						},
																						t._l(t.castInfo, function (e) {
																							return a(
																								'b-card-text',
																								{
																									key: e.id,
																									staticClass:
																										'col-6 pb-0 mb-0',
																								},
																								[
																									a('figure', [
																										a('img', {
																											staticClass: 'img-fluid',
																											attrs: {
																												src: t.getCharacterImage(
																													e
																												),
																											},
																										}),
																										a(
																											'figcaption',
																											{
																												staticClass:
																													'text-center mt-2',
																											},
																											[
																												a(
																													'a',
																													{
																														staticClass:
																															'text-center d-inline-block w-100 mt-2 character-actor',
																														attrs: {
																															href:
																																e.person.url,
																															target: '_blank',
																														},
																													},
																													[
																														t._v(
																															t._s(
																																e.person.name
																															)
																														),
																													]
																												),
																											]
																										),
																									]),
																									a(
																										'p',
																										{
																											staticClass:
																												'text-center character-name',
																										},
																										[
																											t._v(
																												t._s(e.character.name)
																											),
																										]
																									),
																								]
																							)
																						}),
																						1
																				  )
																				: a(
																						'b-card-body',
																						[
																							a(
																								'b-card-text',
																								{
																									staticClass:
																										'col-6 pb-0 mb-0',
																								},
																								[t._v('Sorry, no data')]
																							),
																						],
																						1
																				  ),
																		],
																		1
																	),
																],
																1
															),
															a(
																'b-card',
																{
																	staticClass: 'mb-1',
																	attrs: { 'no-body': '' },
																},
																[
																	a(
																		'b-card-header',
																		{
																			staticClass: 'p-1',
																			class: {
																				disabled:
																					t.crewInfo && !t.crewInfo.length,
																			},
																			attrs: {
																				'header-tag': 'header',
																				role: 'tab',
																			},
																		},
																		[
																			a(
																				'b-button',
																				{
																					directives: [
																						{
																							name: 'b-toggle',
																							rawName: 'v-b-toggle.accordion-2',
																							modifiers: { 'accordion-2': !0 },
																						},
																					],
																					attrs: {
																						block: '',
																						variant: 'light',
																					},
																				},
																				[
																					t.crewInfo && t.crewInfo.length
																						? a('span', [t._v('CREW')])
																						: a('span', [
																								t._v(
																									'CREW (no info available)'
																								),
																						  ]),
																				]
																			),
																		],
																		1
																	),
																	a(
																		'b-collapse',
																		{
																			staticClass: 'accordion-tabpanel',
																			attrs: {
																				id: 'accordion-2',
																				accordion: 'my-accordion',
																				role: 'tabpanel',
																			},
																		},
																		[
																			t.crewInfo
																				? a(
																						'b-card-body',
																						{
																							staticClass:
																								'row flex-nowrap flex-column mx-0',
																						},
																						t._l(t.crewInfo, function (e) {
																							return a(
																								'b-card-text',
																								{
																									key: e.id,
																									staticClass:
																										'col-12 crewMember mb-0',
																								},
																								[
																									a(
																										'span',
																										{
																											staticClass:
																												'crewMember-type',
																										},
																										[t._v(t._s(e.type) + ' -')]
																									),
																									a(
																										'a',
																										{
																											staticClass:
																												'd-inline w-100 mt-2 crewMember-character',
																											attrs: {
																												href: e.person.url,
																												target: '_blank',
																											},
																										},
																										[
																											t._v(
																												' ' +
																													t._s(e.person.name)
																											),
																										]
																									),
																								]
																							)
																						}),
																						1
																				  )
																				: a(
																						'b-card-body',
																						[
																							a(
																								'b-card-text',
																								{
																									staticClass:
																										'col-6 pb-0 mb-0',
																								},
																								[t._v('Sorry, no data')]
																							),
																						],
																						1
																				  ),
																		],
																		1
																	),
																],
																1
															),
														],
														1
													),
												]),
											]),
										]),
									]
							  )
							: t._e(),
					],
					1
				)
			},
			k = [],
			D = {
				name: 'Modal',
				props: ['modalData'],
				data: function () {
					return { castInfo: null, crewInfo: null, openModal: !1 }
				},
				methods: {
					getCastInfo: function (t) {
						var e = this
						return (
							(this.castInfo = null),
							fetch('https://api.tvmaze.com/shows/'.concat(t, '/cast'))
								.then(function (t) {
									return t.json()
								})
								.then(function (t) {
									return (e.castInfo = t)
								})
						)
					},
					getCrewInfo: function (t) {
						var e = this
						return (
							(this.crewInfo = null),
							fetch('https://api.tvmaze.com/shows/'.concat(t, '/crew'))
								.then(function (t) {
									return t.json()
								})
								.then(function (t) {
									return (e.crewInfo = t)
								})
						)
					},
					getCharacterImage: function (t) {
						var e, a, n
						return (
							(null === t ||
							void 0 === t ||
							null === (e = t.image) ||
							void 0 === e
								? void 0
								: e.medium) ||
							(null === t ||
							void 0 === t ||
							null === (a = t.character) ||
							void 0 === a ||
							null === (n = a.image) ||
							void 0 === n
								? void 0
								: n.medium) ||
							'https://cdn.dribbble.com/users/1541938/screenshots/5315198/question-mark.png'
						)
					},
					getFilmPoster: function (t) {
						var e
						return (
							(null === t ||
							void 0 === t ||
							null === (e = t.image) ||
							void 0 === e
								? void 0
								: e.original) ||
							'https://cdn.dribbble.com/users/1541938/screenshots/5315198/question-mark.png'
						)
					},
					classObject: function () {
						return null === this.modalData.rating.average
							? 'none'
							: this.modalData.rating.average < 5
							? 'poor'
							: this.modalData.rating.average >= 5 &&
							  this.modalData.rating.average < 7.5
							? 'avg'
							: 'good'
					},
				},
				watch: {
					modalData: function (t, e) {
						;(this.openModal = t != e),
							this.getCastInfo(t.id),
							this.getCrewInfo(t.id)
					},
				},
			},
			S = D,
			O = (a('78bb'), Object(d['a'])(S, M, k, !1, null, '7394f3d3', null)),
			T = O.exports,
			P = {
				name: 'App',
				components: { Heading: h, Search: w, Tiles: j, Modal: T },
				data: function () {
					return { showsAll: [], dataIncoming: !1, singleShow: null }
				},
				methods: {
					getShowsList: function () {
						var t = this
						return fetch('https://api.tvmaze.com/shows')
							.then(function (t) {
								return t.json()
							})
							.then(function (e) {
								t.showsAll = e
							})
					},
					searchCommenced: function (t) {
						var e = this
						this.$nextTick(function () {
							t && t.length > 0
								? ((e.showsAll = []), (e.showsAll = Object(o['a'])(t)))
								: e.getShowsList()
						})
					},
					openModal: function (t) {
						this.singleShow = t
					},
				},
				beforeMount: function () {
					this.getShowsList()
				},
			},
			$ = P,
			R = (a('5c0b'), Object(d['a'])($, r, s, !1, null, null, null)),
			A = R.exports,
			E = a('5f5b')
		;(n['default'].config.productionTip = !1),
			n['default'].use(E['a']),
			new n['default']({
				render: function (t) {
					return t(A)
				},
			}).$mount('#app')
	},
	'5c0b': function (t, e, a) {
		'use strict'
		var n = a('9c0c'),
			r = a.n(n)
		r.a
	},
	'78bb': function (t, e, a) {
		'use strict'
		var n = a('54e1'),
			r = a.n(n)
		r.a
	},
	'823d': function (t, e, a) {
		'use strict'
		var n = a('de7b'),
			r = a.n(n)
		r.a
	},
	'9c0c': function (t, e, a) {},
	b2b9: function (t, e, a) {
		'use strict'
		var n = a('ed3d'),
			r = a.n(n)
		r.a
	},
	befb: function (t, e, a) {
		t.exports = './img/tv.39ae447a.png'
	},
	de7b: function (t, e, a) {},
	ed3d: function (t, e, a) {},
	f6aa: function (t, e, a) {},
	f90e: function (t, e, a) {
		'use strict'
		var n = a('f6aa'),
			r = a.n(n)
		r.a
	},
})
//# sourceMappingURL=app.6455f380.js.map
