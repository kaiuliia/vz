describe('search', () => {
  it('should have form', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input').should('have.value', '');
    cy.get('select').should('have.value', 'movie');
    cy.get('button').should('have.text', 'Submit');
  });

  it('should display required error when the title is empty', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button[type="submit"]').click();
    cy.get('[role="alert"]').should('contain', 'Please, enter a movie title');
  });

  it('should display search results', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[placeholder="movie title"]').type('Harry Potter');
    cy.get('select').select('movie');
    cy.get('input[placeholder="year"]').type('2004');
    cy.get('button[type="submit"]').click();
    cy.get('div').should('have.length.greaterThan', 0);
    cy.get('div').first();
    cy.get('h3').should('exist').and('not.be.empty');
    cy.get('p').should('exist').and('not.be.empty');
    cy.get('img').should('have.attr', 'src').and('not.be.empty');
  });
});
