const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "lsc2021",
    database: "crudmobile",
})

/*app.get('/', (req, res) => {
    
    let SQL = "INSERT INTO tbprodutos (codigoProduto, descricaoProduto, precoProduto, categoria) VALUES('prod1', 'Este é o produto 1', 52.75, 'teste')";

    db.query(SQL, (err, result) =>{
        console.log(err);
    })
})*/

app.use(cors());
app.use(express.json());

//Categoria
app.post("/createCategoria", (req, res) =>{
    const { codigoCategoria } = req.body;
    const { nome } = req.body;

    let SQL = "INSERT INTO tbcategorias ( codigoCategoria, nome) VALUES (?,?)";

    db.query(SQL, [codigoCategoria, nome], (err, result) => {
        if(result){
            res.status(200).json("categoria criada");
        }
        console.log(err);
    });
});

app.get("/obtemCategoria/:codigoCategoria", (req, res) =>{
    const codigoCategoria = req.params.codigoCategoria;

    let SQL = "SELECT codigoCategoria, nome FROM tbcategorias WHERE codigoCategoria = ?";
    
    db.query(SQL, [codigoCategoria], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Ocorreu um erro ao buscar a categoria." });
        } else {
            console.log(result);
            if (result.length === 0) {
              res.status(200).json("Categoria não Encontrada");
            } else {
              const categoria = result[0];
              res.status(200).json(categoria);
            }
        }
    });
});

app.get("/obtemTodasCategorias", (req, res) =>{

    let SQL = "SELECT * FROM tbcategorias";
    
    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Ocorreu um erro ao buscar as categorias." });
        } else {
            console.log(result);
            if (result.length === 0) {
              console.log('0 categorias');
              res.status(200).json("Categorias não Encontradas");
            } else {
              const produto = result;
              res.status(200).json(produto);
            }
        }
    });
});

app.post("/alteraCategoria/:codigoCategoria", (req, res) => {
    const codigoCategoria = req.params.codigoCategoria; 
    const { nome } = req.body;

    let SQL = "UPDATE tbcategorias SET nome = ? WHERE codigoCategoria = ?";

    db.query(SQL, [nome, codigoCategoria], (err, result) => {
      if (err) {
        console.log('Erro de Update');
        console.error('Ocorreu um erro na solicitação:', err);
        res.status(500).json({ error: "Ocorreu um erro ao alterar a categoria." });
      } else {
        res.status(200).json({ message: "Aategoria alterada com sucesso." });
      }
    });

    console.log('terminou');
});

app.delete("/excluiCategoria/:codigoCategoria", (req, res) => {
    const codigoCategoria = req.params.codigoCategoria;

    let SQL = "DELETE FROM tbcategorias WHERE codigoCategoria = ?";
  
    db.query(SQL, [codigoCategoria], (err, result) => {
      if (err) {
        console.log('Erro de Exclusão');
        console.error('Ocorreu um erro na solicitação:', err);
        res.status(500).json({ error: "Ocorreu um erro ao excluir a Categoria." });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: "Categoria não encontrada." });
        } else {
          res.status(200).json({ message: "Categoria excluída com sucesso." });
        }
      }
    });
});

app.delete("/excluiTodasCategorias", (req, res) => {

    let SQL = "DELETE FROM tbcategorias";
  
    db.query(SQL, (err, result) => {
      if (err) {
        console.log('Erro de Exclusão');
        console.error('Ocorreu um erro na solicitação:', err);
        res.status(500).json({ error: "Ocorreu um erro ao excluir todos as Categorias." });
      } else {
        res.status(200).json({ message: "Todas as Categorias foram excluídas com sucesso." });
      }
    });
});

//Produtos
app.post("/createProduto", (req, res) =>{
    console.log(req.body.codigoProduto);
    console.log(req.body);
    const { codigoProduto } = req.body;
    const { descricaoProduto } = req.body;
    const { precoProduto } = req.body;
    const { categoria } = req.body;

    console.log(descricaoProduto);

    let SQL = "INSERT INTO tbprodutos ( codigoProduto, descricaoProduto, precoProduto, categoria ) VALUES (?,?,?,?)";

    db.query(SQL, [codigoProduto, descricaoProduto, precoProduto, categoria], (err, result) => {
        if(result){
            res.status(200).json("produto criado");
        }
        console.log(err);
    });
});

app.get("/obtemProduto/:codigoProduto", (req, res) =>{
    const codigoProduto = req.params.codigoProduto;

    let SQL = "SELECT codigoProduto, descricaoProduto, precoProduto, categoria FROM tbprodutos WHERE codigoProduto = ?";
    
    db.query(SQL, [codigoProduto], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Ocorreu um erro ao buscar o produto." });
        } else {
            console.log(result);
            if (result.length === 0) {
              res.status(200).json("Produto não Encontrado"); // Produto não encontrado
            } else {
              const produto = result[0];
              res.status(200).json(produto);
            }
        }
    });
});

app.get("/obtemTodosProdutos", (req, res) =>{

    let SQL = "SELECT * FROM tbprodutos";
    
    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Ocorreu um erro ao buscar os produtos." });
        } else {
            console.log(result);
            if (result.length === 0) {
              console.log('0 produtos');
              res.status(200).json("Produtos não Encontrados"); // Produto não encontrado
            } else {
              const produto = result;
              res.status(200).json(produto);
            }
        }
    });
});

app.get("/obtemProdutosFiltrados/:filtro", (req, res) => {
    const filtro = req.params.filtro;
  
    let SQL = "SELECT * FROM tbprodutos WHERE categoria LIKE ?";
    db.query(SQL, [`%${filtro}%`], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Ocorreu um erro ao buscar os produtos filtrados." });
      } else {
        console.log(result);
        if (result.length === 0) {
          console.log('0 produtos');
          res.status(200).json("Produtos não Encontrados"); // Produto não encontrado
        } else {
          const produtosFiltrados = result;
          res.status(200).json(produtosFiltrados);
        }
      }
    });
});

app.post("/alteraProduto/:codigoProduto", (req, res) => {
    const codigoProduto = req.params.codigoProduto; // Obtém o código do produto da URL
    const { descricaoProduto, precoProduto, categoria } = req.body;

    console.log(codigoProduto);
    console.log(descricaoProduto);
    console.log(precoProduto);
    console.log(categoria);
  
    // Construa a consulta SQL para atualizar os dados do produto
    let SQL = "UPDATE tbprodutos SET descricaoProduto = ?, precoProduto = ?, categoria = ? WHERE codigoProduto = ?";

    db.query(SQL, [descricaoProduto, precoProduto, categoria, codigoProduto], (err, result) => {
      if (err) {
        console.log('Erro de Update');
        console.error('Ocorreu um erro na solicitação:', err);
        res.status(500).json({ error: "Ocorreu um erro ao alterar o produto." });
      } else {
        res.status(200).json({ message: "Produto alterado com sucesso." });
      }
    });

    console.log('terminou');
});

app.delete("/excluiProduto/:codigoProduto", (req, res) => {
    console.log('chamou o exclui produto');
    const codigoProduto = req.params.codigoProduto;
    console.log(codigoProduto);

    let SQL = "DELETE FROM tbprodutos WHERE codigoProduto = ?";
  
    db.query(SQL, [codigoProduto], (err, result) => {
      if (err) {
        console.log('Erro de Exclusão');
        console.error('Ocorreu um erro na solicitação:', err);
        res.status(500).json({ error: "Ocorreu um erro ao excluir o produto." });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: "Produto não encontrado." });
        } else {
          res.status(200).json({ message: "Produto excluído com sucesso." });
        }
      }
    });
});

app.delete("/excluiTodosProdutos", (req, res) => {

    let SQL = "DELETE FROM tbprodutos";
  
    db.query(SQL, (err, result) => {
      if (err) {
        console.log('Erro de Exclusão');
        console.error('Ocorreu um erro na solicitação:', err);
        res.status(500).json({ error: "Ocorreu um erro ao excluir todos os produtos." });
      } else {
        res.status(200).json({ message: "Todos os produtos foram excluídos com sucesso." });
      }
    });
});
  
//Vendas
app.get("/obtemTodasVendas", (req, res) =>{

    let SQL = "SELECT * FROM tbvendas";
    
    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Ocorreu um erro ao buscar as vendas." });
        } else {
            console.log(result);
            if (result.length === 0) {
              console.log('0 vendas');
              res.status(200).json("Vendas não Encontradas");
            } else {
              const produto = result;
              res.status(200).json(produto);
            }
        }
    });
});

app.post("/createVenda", (req, res) => {
    const query = 'INSERT INTO tbVendas (dataVenda) VALUES (CURRENT_TIMESTAMP)';
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Ocorreu um erro ao adicionar a venda." });
      } else {
        console.log('Venda adicionada com sucesso');
        const vendaId = result.insertId;
        res.status(200).json({ vendaId });
      }
    });
});
  
//Vendas Efetivadas
app.post("/adicionaProdutoNaVenda", (req, res) => {
    const { codigoProduto, quantidade, codigoVenda } = req.body;
  
    // Execute a inserção na tabela tbvendasprodutos
    const query = 'INSERT INTO tbvendasprodutos (codigoVenda, codigoProduto, quantidade) VALUES (?, ?, ?)';
    db.query(query, [codigoVenda, codigoProduto, quantidade], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Ocorreu um erro ao adicionar o produto à venda." });
      } else {
        if (result.affectedRows > 0) {
          console.log('Produto adicionado à venda com sucesso');
          res.status(200).json({ success: true });
        } else {
          console.log('Nenhum produto foi adicionado à venda');
          res.status(200).json({ success: false });
        }
      }
    });
});

app.get("/obtemVendaProduto/:codigoVenda", (req, res) => {
    const codigoVenda = req.params.codigoVenda;
    console.log(codigoVenda);
    // Execute a consulta SQL para obter os produtos da venda
    const query = `
      SELECT vp.codigoVenda, vp.codigoProduto, vp.quantidade, p.descricaoProduto, p.precoProduto
      FROM tbvendasprodutos vp
      JOIN tbprodutos p ON vp.codigoProduto = p.codigoProduto
      WHERE vp.codigoVenda = ?`;
  
    db.query(query, [codigoVenda], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Ocorreu um erro ao buscar os produtos da venda." });
      } else {
        const produtosDaVenda = [];
  
        for (const row of result) {
          const obj = {
            codigoVenda: row.codigoVenda,
            codigoProduto: row.codigoProduto,
            quantidade: row.quantidade,
            descricaoProduto: row.descricaoProduto,
            precoProduto: row.precoProduto,
          };
          produtosDaVenda.push(obj);
        }
  
        res.status(200).json(produtosDaVenda);
      }
    });
});  


app.listen(3001, () => {
    console.log("rodando servidor");
});

