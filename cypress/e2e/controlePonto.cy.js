describe("API Controle de Ponto", () => {
  const baseUrl = "http://localhost:3000/api/pontos";

  it("Deve registrar um ponto para um funcionário", () => {
    const ponto = {
      funcionarioId: 17,
      dataHora: "2024-12-14T08:00:00Z",
      tipo: "entrada",
    };

    cy.request({
      method: "POST",
      url: `${baseUrl}/registrar`,
      body: ponto,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");
      expect(response.body.funcionarioId).to.eq(ponto.funcionarioId);
      expect(response.body.tipo).to.eq(ponto.tipo);
    });
  });

  it("Deve retornar os registros de ponto de um funcionário", () => {
    const funcionarioId = 17;

    cy.request({
      method: "GET",
      url: `${baseUrl}?funcionarioId=${funcionarioId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      response.body.forEach((registro) => {
        expect(registro).to.have.property("funcionarioId", funcionarioId);
        expect(registro).to.have.property("dataHora");
        expect(registro).to.have.property("tipo");
      });
    });
  });
});
