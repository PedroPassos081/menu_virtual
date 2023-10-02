$(document).ready(() => {
  cardapio.eventos.init();
});

var cardapio = {};

cardapio.eventos = {
  init: () => {
    cardapio.metodos.obterItensCardapio();
  },
};

cardapio.metodos = {
  //obtem a lista de itens do cardápio
  obterItensCardapio: (categoria = "burgers", vermais = false) => {
    var filtro = MENU[categoria];
    console.log(filtro);

    if (!vermais) {
      $("#itensCardapio").html("");
      $("#btnVermais").removeClass("hidden");
    }

    $.each(filtro, (i, e) => {
      let temp = cardapio.templates.item
        .replace(/\${img}/g, e.img)
        .replace(/\${name}/g, e.name)
        .replace(/\${price}/g, e.price.toFixed(2).replace(".", ","));

      //botao ver mais foi clicado (12 itens)
      if (vermais && i >= 8 && i < 12) {
        $("#itensCardapio").append(temp);
      }

      //paginação inicial (8 itens)
      if (!vermais && i < 8) {
        $("#itensCardapio").append(temp);
      }
    });

    //remove o ativo
    $(".container-menu a").removeClass("active");

    //seta o menu para ativo
    $("#menu-" + categoria).addClass("active");
  },

  //clique no botão de ver mais
  verMais: () => {
    var ativo = $(".container-menu a.active").attr("id").split("menu-")[1];
    cardapio.metodos.obterItensCardapio(ativo, true);

    $("#btnVermais").addClass("hidden");
  },
};

cardapio.templates = {
  item: `
    <div class="col-3 mb-5">
    <div class="card card-item">
        <div class="img-produto">
            <img src="\${img}">
        </div>
        <p class="title-produto text-center mt-4">
            <b>\${name}</b>
        </p>
        <p class="price-produto text-center">
            <b>\${price}</b>
        </p>
        <div class="add-carrinho">
            <span class="btn-menos"><i class="fas fa-minus"></i></span>
            <span class="add-numero-itens">0</span>
            <span class="btn-mais"><i class="fas fa-plus"></i></span>
            <span class="btn btn-add"><i class="fas fa-shopping-bag"></i></span>
        </div>
    </div>
</div>
    `,
};
