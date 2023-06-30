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
});
