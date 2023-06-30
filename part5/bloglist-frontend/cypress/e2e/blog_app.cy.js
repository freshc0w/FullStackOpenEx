describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);

		const user = {
			name: 'Matti Luukkainen',
			username: 'mluukkai',
			password: 'salainen',
		};

		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
		cy.visit('');
	});

	it('Login form is shown', function () {
		cy.contains('username');
		cy.get('#username');
		cy.contains('password');
		cy.get('#password');
	});

	it('login form can be opened', function () {
		cy.contains('login').click();
	});

	describe('user can login', function () {
		it('succeeds with correct credientials', function () {
			cy.contains('login').click();
			cy.get('#username').type('mluukkai');
			cy.get('#password').type('salainen');
			cy.get('#login-button').click();

			cy.contains('Matti Luukkainen logged in');
		});

		it('fails with wrong credentials', function () {
			// // Need to log out first
			// cy.contains('logout').click()
			cy.contains('login').click();
			cy.get('#username').type('mluukkai');
			cy.get('#password').type('wrong');
			cy.get('#login-button').click();

			// Check styling of Notification
			cy.get('.error')
				.should('contain', 'wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid');
		});
	});

	describe('when logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'mluukkai', password: 'salainen' });
			cy.createBlog({
				title: 'new blog1',
				author: 'Freshc0w',
				url: 'http://bat.com',
			});
		});

		it('a blog can be created', function () {
			cy.get('.toggle-visible').click();
			cy.get('#title-input').type('new blog2');
			cy.get('#author-input').type('Freshc0w');
			cy.get('#url-input').type('http://bat.com');

			cy.get('#submit-blog').click();
			cy.contains('new blog2');
		});

		it('user can like a blog', function () {
			cy.get('button.clkBtn').then(btns => {
				console.log('nmber of btns', btns.length);
				cy.wrap(btns[0]).click();
			});
			cy.get('button.likeBtn').click();
			cy.contains('likes 1');
		});

		it('user can delete their created blog', function () {
			cy.createBlog({
				title: 'new blog2',
				author: 'Freshc0w',
				url: 'http://bat.com',
			});
			cy.get('button.clkBtn').then(btns => {
				cy.wrap(btns[1]).click();
			});
			// check if exist first
			cy.contains('new blog2');
			cy.get('button.removeBtn').then(btns => {
				cy.wrap(btns[1]).click();
			});
			cy.contains('new blog2').should('not.exist');
		});
	});
});
