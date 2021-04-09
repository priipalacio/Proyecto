using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DatosClient;
using System.Data;
using System.Web.Http.Cors;

namespace Back.Controllers
{
    [EnableCors(origins: "http://localhost:4200",headers: "Access-Control-Allow-Origin: * ", methods: "Access-Control-Allow-Methods: POST, GET, PUT, DELETE")]
    public class ClientController : ApiController
    {
            
        // GET: Client

        //public string Get()
        //{
        //    return "Hola";
        //}

        
        public List<Clients> Get()
        {
            using(DB1Entities db = new DB1Entities())
            {
               List<Clients> lista =  db.Clients.ToList();

                return lista;
            }
            
        }


        [HttpPost]
        public IHttpActionResult Post([FromBody] Clients client)
        {
            using (DB1Entities db = new DB1Entities())
            {
                try
                {
                    db.Clients.Add(client);
                    db.SaveChanges();
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);

                }
            }

        }

        [HttpPut]

        public IHttpActionResult Put(int id,[FromBody]Clients client)
        {
            using (DB1Entities db = new DB1Entities())
            {
                try
                {
                    if(id != client.idClient)
                    {
                        return NotFound();
                    }
                    else
                    {
                        db.Entry(client).State = EntityState.Modified;
                        db.SaveChanges();
                        return Ok();
                    }
                }
                catch(Exception ex )
                {
                    return BadRequest(ex.Message);

                }
            }

        }


        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            using(DB1Entities db = new DB1Entities())
            {
                Clients cl = db.Clients.Where(x => x.idClient == id).FirstOrDefault<Clients>();

                try
                {
                    if (cl != null)
                    {
                        db.Entry(cl).State = EntityState.Deleted;
                        db.SaveChanges();

                        return Ok();
                    }  else
                    {
                        throw new ApplicationException("No se encontro ningun cliente"); 
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);

                }

            }
        }



    }
}
