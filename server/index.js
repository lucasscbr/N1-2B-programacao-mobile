const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require('jsonwebtoken');

//Chave
const jwtSecret = '5lHJSUGFoqvaKW_VtAdA7l2Y9tGe2xcD_WBa8S1qlqULOzrddSy8aEVg6SaespAckg8N1G8BjJ_j4YeFseeskqbRB3jiqhnXRbfDMlv_PUd9P_dXZzwuX7uhafhVrqBmTzZ8UYkTP4D7O6MLH6ifefeJYrS0w-7WM5x_ba_s20';

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "lsc2021",
    database: "crudmobile",
})

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("rodando servidor 3001");
});

//Categoria
//app.post("/createCategoria", (req, res) =>{
  app.post("/createCategoria", verifyToken, (req, res) => {
    const { codigoCategoria } = req.body;
    const { nome } = req.body;

    let categoria = {
      codigoCategoria: codigoCategoria,
      nome: nome,
    };

    // Valide a categoria
    const validationErrors = validateCategoria(categoria);

    if (validationErrors.length > 0) {
      // Se houver erros, retorne a lista de erros como resposta
      console.log('Teve erro na categoria');
      res.status(200).json({ errors: validationErrors });
      return;
    }

    let SQL = "INSERT INTO tbcategorias ( codigoCategoria, nome) VALUES (?,?)";

    db.query(SQL, [codigoCategoria, nome], (err, result) => {
        if(result){
            res.status(200).json("categoria criada");
        }
        console.log(err);
    });
});

app.get("/obtemCategoria/:codigoCategoria", verifyToken, (req, res) =>{
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

app.get("/obtemTodasCategorias", verifyToken, (req, res) =>{

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

app.post("/alteraCategoria/:codigoCategoria", verifyToken, (req, res) => {
    const codigoCategoria = req.params.codigoCategoria; 
    const { nome } = req.body;

    let categoria = {
      codigoCategoria: codigoCategoria,
      nome: nome,
    };

    // Valide a categoria
    const validationErrors = validateCategoria(categoria);

    if (validationErrors.length > 0) {
      // Se houver erros, retorne a lista de erros como resposta
      console.log('Teve erro na categoria');
      res.status(200).json({ errors: validationErrors });
      return;
    }

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

app.delete("/excluiCategoria/:codigoCategoria", verifyToken,(req, res) => {
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

app.delete("/excluiTodasCategorias", verifyToken, (req, res) => {

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
app.post("/createProduto", verifyToken, (req, res) =>{
    const { codigoProduto } = req.body;
    const { descricaoProduto } = req.body;
    const { precoProduto } = req.body;
    const { categoria } = req.body;

    let produto = {
      codigoProduto: codigoProduto,
      descricaoProduto: descricaoProduto,
      precoProduto: precoProduto,
      categoria: categoria,
    };

    // Valide o produto
    const validationErrors = validateProduto(produto);

    if (validationErrors.length > 0) {
      // Se houver erros, retorne a lista de erros como resposta
      console.log('Teve erro no produto');
      res.status(200).json({ errors: validationErrors });
      return;
    }

    let SQL = "INSERT INTO tbprodutos ( codigoProduto, descricaoProduto, precoProduto, categoria ) VALUES (?,?,?,?)";

    db.query(SQL, [codigoProduto, descricaoProduto, precoProduto, categoria], (err, result) => {
        if(result){
            res.status(200).json("produto criado");
        }
        console.log(err);
    });
});

app.get("/obtemProduto/:codigoProduto", verifyToken, (req, res) =>{
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

app.get("/obtemTodosProdutos", verifyToken, (req, res) =>{

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

app.get("/obtemProdutosFiltrados/:filtro", verifyToken, (req, res) => {
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

app.post("/alteraProduto/:codigoProduto", verifyToken, (req, res) => {
    const codigoProduto = req.params.codigoProduto; // Obtém o código do produto da URL
    const { descricaoProduto, precoProduto, categoria } = req.body;

    let produto = {
      codigoProduto: codigoProduto,
      descricaoProduto: descricaoProduto,
      precoProduto: precoProduto,
      categoria: categoria,
    };

    // Valide o produto
    const validationErrors = validateProduto(produto);

    if (validationErrors.length > 0) {
      // Se houver erros, retorne a lista de erros como resposta
      console.log('Teve erro no produto alterar');
      res.status(200).json({ errors: validationErrors });
      return;
    }

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

app.delete("/excluiProduto/:codigoProduto", verifyToken, (req, res) => {
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

app.delete("/excluiTodosProdutos", verifyToken, (req, res) => {

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
//app.get("/obtemTodasVendas", (req, res) =>{
app.get("/obtemTodasVendas", verifyToken, (req, res) =>{

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
app.post("/adicionaProdutoNaVenda", verifyToken, (req, res) => {
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

app.get("/obtemVendaProduto/:codigoVenda", verifyToken, (req, res) => {
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

//Login
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(200).json({ errors: ['Usuário e senha são obrigatórios'] });
  }

  // Consulta SQL para verificar o usuário e senha
  const query = 'SELECT * FROM tbusuarios WHERE usuario = ? AND senha = ?';

  db.query(query, [usuario, senha], (err, results) => {
    if (err) {
      console.error('Erro na consulta ao banco de dados:', err);
      return res.status(500).json({ error: 'Erro interno' });
    }

    if (results.length === 0) {
      return res.status(200).json({ errors: ['Credenciais inválidas'] });
    }

    // Autenticação bem-sucedida, gera token jwt
    const user = results[0];
    const token = jwt.sign({ usuario: user.usuario }, jwtSecret);
    console.log("Token feito: " + token);

    res.status(200).json({ token });
  });
});

app.post('/criarUsuario', (req, res) => {
  const { nome, usuario, senha } = req.body;

  let user = {
    usuario: usuario,
    nome: nome,
    senha: senha,
  };

  // Valide a categoria
  const validationErrors = validateUsuario(user);

  if (validationErrors.length > 0) {
    // Se houver erros, retorne a lista de erros como resposta
    console.log('Teve erro na categoria');
    res.status(200).json({ errors: validationErrors });
    return;
  }

  // Consulta SQL para inserir um novo usuário na tabela
  const query = 'INSERT INTO tbusuarios (nome, usuario, senha) VALUES (?, ?, ?)';

  db.query(query, [nome, usuario, senha], (err, result) => {
    if (err) {
      console.error('Erro na inserção do usuário:', err);
      return res.status(500).json({ error: 'Erro interno' });
    }

    // Verifique se a inserção foi bem-sucedida
    if (result.affectedRows === 1) {
      res.status(201).json({ message: 'Usuário criado com sucesso' });
    } else {
      res.status(500).json({ error: 'Falha ao criar o usuário' });
    }
  });
});

//Dashboard
app.get("/salesSummary", (req, res) => {
  // Consulta SQL para obter o total de vendas feitas e os dados de data da venda
  console.log('salesSummary');
  const query = `
    SELECT DATE(dataVenda) AS data, SUM(vp.quantidade * p.precoProduto) AS total
    FROM tbvendasprodutos vp
    JOIN tbvendas v ON vp.codigoVenda = v.codigoVenda
    JOIN tbprodutos p ON vp.codigoProduto = p.codigoProduto
    GROUP BY DATE(dataVenda)
    ORDER BY DATE(dataVenda)`;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      console.log('Deu erro em');
      res.status(500).json({ error: "Ocorreu um erro ao buscar os dados de vendas." });
    } else {
      const salesData = result.map((row) => ({
        date: new Date(row.data).toLocaleDateString(),
        total: row.total,
      }));

      // Calcular o total de vendas
      const totalSales = salesData.reduce((total, sale) => total + sale.total, 0);

      console.log('totalSales -> ' + totalSales);
      console.log(JSON.stringify(salesData, null, 2));
      console.log('salesData.date -> ' + salesData.date);
      console.log('salesData.total -> ' + salesData.total);

      res.status(200).json({ totalSales, salesData });
    }
  });
});


function validateProduto(produto) {
  const errors = [];

  if (!produto.codigoProduto) {
    errors.push("Campo Código é obrigatório.");
  }

  if (!produto.descricaoProduto) {
    errors.push("Campo Descrição é obrigatório.");
  }

  if (produto.precoProduto <= 0) {
    errors.push("Campo Preço deve ser maior que R$0,00.");
  }

  if (!produto.categoria) {
    errors.push("Campo Categoria é obrigatório.");
  }

  return errors;
}

function validateCategoria(categoria) {
  const errors = [];

  if (!categoria.codigoCategoria) {
    errors.push("Campo Código é obrigatório.");
  }

  if (!categoria.nome) {
    errors.push("Campo Nome é obrigatório.");
  }

  return errors;
}

function validateUsuario(usuario) {
  const errors = [];

  if (!usuario.usuario) {
    errors.push("Campo Usuario é obrigatório.");
  }

  if (!usuario.nome) {
    errors.push("Campo Nome é obrigatório.");
  }
  
  if (!usuario.senha) {
    errors.push("Campo Senha é obrigatório.");
  }
  return errors;
}

function verifyToken(req, res, next) {
  console.log("verifyToken");
  const token = req.headers['authorization'];

  if (!token) {
    console.log('Token de autenticação não fornecido');
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.log('Token de autenticação inválido');
      return res.status(401).json({ error: 'Token de autenticação inválido' });
    }

    req.user = decoded;
    console.log("token válido!");
    next();
  });
}


