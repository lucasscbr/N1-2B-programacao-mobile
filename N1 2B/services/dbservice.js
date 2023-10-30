import * as SQLite from 'expo-sqlite';


export function getDbConnection() {
    const cx = SQLite.openDatabase('dbN21Bv2.db');
    return cx;
}

export async function createTableProdutos() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbProdutos
        (
            codigoProduto text not null primary key,
            descricaoProduto text not null,
            precoProduto double not null,
            categoria text not null           
        )`;

        let dbCx = getDbConnection();        
        
        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true); 
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export async function createTableVendas() {
    return new Promise((resolve, reject) => {
      const query = `CREATE TABLE IF NOT EXISTS tbVendas
      (
          codigoVenda INTEGER PRIMARY KEY AUTOINCREMENT,
          dataVenda DATETIME DEFAULT CURRENT_TIMESTAMP
      )`;
  
      let dbCx = getDbConnection();
  
      dbCx.transaction(
        (tx) => {
          tx.executeSql(query);
          resolve(true);
        },
        (error) => {
          console.log(error);
          resolve(false);
        }
      );
    });
}

export async function createTableVendasProdutos() {
    return new Promise((resolve, reject) => {
      const query = `CREATE TABLE IF NOT EXISTS tbVendasProdutos
      (
          codigoVenda INTEGER,
          codigoProduto TEXT,
          quantidade INTEGER,
          FOREIGN KEY (codigoVenda) REFERENCES tbVendas(codigoVenda),
          FOREIGN KEY (codigoProduto) REFERENCES tbProdutos(codigoProduto)
      )`;
  
      let dbCx = getDbConnection();
  
      dbCx.transaction(
        (tx) => {
          tx.executeSql(query);
          resolve(true);
        },
        (error) => {
          console.log(error);
          resolve(false);
        }
      );
    });
}

export async function createTableCategorias() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbCategorias
        (
            codigoCategoria text not null primary key,
            nome text not null      
        )`;

        let dbCx = getDbConnection();        
        
        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true); 
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export function obtemTodosProdutos() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbProdutos';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codigoProduto: registros.rows.item(n).codigoProduto,
                            descricaoProduto: registros.rows.item(n).descricaoProduto,
                            precoProduto: registros.rows.item(n).precoProduto,
                            categoria: registros.rows.item(n).categoria
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function obtemProdutosFiltrado(filtro) {
    return new Promise((resolve, reject) => {
      let dbCx = getDbConnection();
      dbCx.transaction((tx) => {
        // Use um parâmetro ? para o filtro e passe-o como um array no segundo argumento da função executeSql
        let query = 'SELECT * FROM tbProdutos WHERE categoria LIKE ?';
        tx.executeSql(
          query,
          [`%${filtro}%`], // Use % para corresponder a qualquer parte da descrição do produto
          (tx, registros) => {
            var retorno = [];
  
            for (let n = 0; n < registros.rows.length; n++) {
              let obj = {
                codigoProduto: registros.rows.item(n).codigoProduto,
                descricaoProduto: registros.rows.item(n).descricaoProduto,
                precoProduto: registros.rows.item(n).precoProduto,
                categoria: registros.rows.item(n).categoria,
              };
              retorno.push(obj);
            }
            resolve(retorno);
          },
          (tx, error) => {
            console.log(error);
            resolve([]);
          }
        );
      });
    });
}

export function obtemTodasVendas() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbVendas';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codigoVenda: registros.rows.item(n).codigoVenda,
                            dataVenda: registros.rows.item(n).dataVenda
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function obtemTodasCategorias() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbCategorias';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codigoCategoria: registros.rows.item(n).codigoCategoria,
                            nome: registros.rows.item(n).nome
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function obtemVendaProduto(codigoVenda) {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = `
                SELECT vp.codigoVenda, vp.codigoProduto, vp.quantidade, p.descricaoProduto, p.precoProduto
                FROM tbVendasProdutos vp
                JOIN tbProdutos p ON vp.codigoProduto = p.codigoProduto
                WHERE vp.codigoVenda = ?`;
            tx.executeSql(query, [codigoVenda],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codigoVenda: registros.rows.item(n).codigoVenda,
                            codigoProduto: registros.rows.item(n).codigoProduto,
                            quantidade: registros.rows.item(n).quantidade,
                            descricaoProduto: registros.rows.item(n).descricaoProduto,
                            precoProduto: registros.rows.item(n).precoProduto
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function obtemProduto(codigoProduto) {
    console.log('Procurando produto ' + codigoProduto);
    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select codigoProduto, descricaoProduto, precoProduto from tbProdutos where codigoProduto=?';
            tx.executeSql(query, [codigoProduto],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codigoProduto: registros.rows.item(n).codigoProduto,
                            descricaoProduto: registros.rows.item(n).descricaoProduto,
                            precoProduto: registros.rows.item(n).precoProduto,
                            categoria: registros.rows.item(n).categoria                           
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function obtemCategoria(codigoCategoria) {
    console.log('Procurando categoria ' + codigoCategoria);
    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select codigoCategoria, nome from tbCategorias where codigoCategoria=?';
            tx.executeSql(query, [codigoCategoria],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codigoCategoria: registros.rows.item(n).codigoCategoria,
                            nome: registros.rows.item(n).nome
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function adicionaProduto(produto) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbProdutos (codigoProduto, descricaoProduto ,precoProduto,categoria) values (?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.codigoProduto, produto.descricaoProduto, produto.precoProduto, produto.categoria],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function adicionaVenda() {
    return new Promise((resolve, reject) => {
      console.log('adicionaVenda');
      const query = 'INSERT INTO tbVendas (dataVenda) VALUES (CURRENT_TIMESTAMP)';
      const dbCx = getDbConnection();
  
      dbCx.transaction(
        (tx) => {
          tx.executeSql(query, [], (tx, resultado) => {
            resolve(resultado.insertId); // Retorna o ID da venda inserida
          });
        },
        (error) => {
          console.log(error);
          resolve(false);
        }
      );
    });
}

export function adicionaCategoria(categoria) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbCategorias (codigoCategoria, nome) values (?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [categoria.codigoCategoria, categoria.nome],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function adicionaProdutoNaVenda(produtoVenda) {
    console.log('adicionaProdutoNaVenda');
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO tbVendasProdutos (codigoVenda, codigoProduto, quantidade) VALUES (?, ?, ?)';
      const dbCx = getDbConnection();
  
      dbCx.transaction(
        (tx) => {
          tx.executeSql(query, [produtoVenda.codigoVenda, produtoVenda.codigoProduto, produtoVenda.quantidade], (tx, resultado) => {
            resolve(resultado.rowsAffected > 0);
          });
        },
        (error) => {
          console.log(error);
          resolve(false);
        }
      );
    });
}

export function alteraProduto(produto) {
    console.log('começando o método alteraProduto');
    console.log('produto.categoria -> ' + produto.categoria);
    return new Promise((resolve, reject) => {
        let query = 'update tbProdutos set descricaoProduto=?, precoProduto=?, categoria=? where codigoProduto=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.descricaoProduto, produto.precoProduto, produto.categoria, produto.codigoProduto],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log('error => ' + error);
                resolve(false);
            }
        )
    }
    );
}

export function alteraCategoria(categoria) {
    console.log('começando o método alteraCategoria');
    return new Promise((resolve, reject) => {
        let query = 'update tbCategorias set nome=? where codigoCategoria=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [categoria.nome, categoria.codigoCategoria],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function excluiProduto(codigoProduto) {
    console.log('Apagando produto ' + codigoProduto);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbProdutos where codigoProduto=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [codigoProduto],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function excluiCategoria(codigoCategoria) {
    console.log('Apagando categoria ' + codigoCategoria);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbCategorias where codigoCategoria=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [codigoCategoria],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function excluiTodosProdutos() {
    console.log("Apagando todos as produtos...");
    return new Promise((resolve, reject) => {
        let query = 'delete from tbProdutos';
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [],
                (tx, resultado) => resolve(resultado.rowsAffected > 0)
            );
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    }
    );
}

export function excluiTodasCategorias() {
    console.log("Apagando todas as categorias...");
    return new Promise((resolve, reject) => {
        let query = 'delete from tbCategorias';
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [],
                (tx, resultado) => resolve(resultado.rowsAffected > 0)
            );
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    }
    );
}

