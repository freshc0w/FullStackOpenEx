describe('Note app', function () {
	beforeEach(function () {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`); // resets db

		const user = {
			name: 'Matti Luukkainen',
			username: 'mluukkai',
			password: 'salainen',
		};

		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
		cy.visit('');
	});

  it('then example', function() {
    cy.get('button').then(buttons => {
      console.log('number of buttons', buttons.length)
      cy.wrap(buttons[0]).click()
    })
  })

	it('login form can be opened', function () {
		cy.contains('login').click();
	});

	it('user can login', function () {
		cy.contains('login').click();
		cy.get('#username').type('mluukkai');
		cy.get('#password').type('salainen');
		cy.get('#login-button').click();

		cy.contains('Matti Luukkainen logged in');
	});

	it('login fails with wrong password', function () {
		cy.contains('login').click();
		cy.get('#username').type('mluukkai');
		cy.get('#password').type('wrong');
		cy.get('#login-button').click();

		cy.get('.error').contains('Wrong credentials');
		// cypress requires color to be in RGB format
		cy.get('.error')
			.should('contain', 'Wrong credentials')
			.and('have.css', 'color', 'rgb(255, 0, 0)')
			.and('have.css', 'border-style', 'solid');

		cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
	});

	describe('when logged in', function () {
		// this.beforeEach(function () {
		// 	cy.contains('login').click();
		// 	cy.get('#username').type('mluukkai');
		// 	cy.get('#password').type('salainen');
		// 	cy.get('#login-button').click();
		// });
		// bypasses UI allowing for faster testing
		beforeEach(function () {
			cy.login({ username: 'mluukkai', password: 'salainen' });
		});

		it('a new note can be created', function () {
			cy.get('.toggleVisible').click();
			cy.get('#note-input').type('a note created by cypress');
			cy.contains('save').click();
			cy.contains('a note created by cypress');
		});

		describe('and several notes exist', function () {
			beforeEach(function () {
				cy.createNote({
					content: 'first note',
					important: false,
				});
				cy.createNote({
					content: 'second note',
					important: false,
				});
				cy.createNote({
					content: 'third note',
					important: false,
				});
			});

			it('one of those can be made important', function () {
				// Be careful of the contains. It references directly the component
				// and so if the span covers 'second note', 'make imporant' is not
				// visible
        // CANNOT USE GET because it always searches from the WHOLE page
				cy.contains('second note').parent().find('button').click();
				cy.contains('second note')
					.parent()
					.find('button')
					.should('contain', 'make not important');

        // Shorter way using 'as'
        cy.contains('second note').parent().find('button').as('theBtn')
        cy.get('@theBtn').click()
        cy.get('@theBtn').should('contain', 'make not important');
        
			});
		});
	});
});
