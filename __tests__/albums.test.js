/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album } = require('../src/sequelize');

describe('/albums', () => {
  let artist;

  before(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /artists/:artistId/albums', () => {
    it('creates a new album for a given artist', (done) => {
      request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(201);

          Album.findByPk(res.body.id, { raw: true }).then((album) => {
            expect(album.name).to.equal('InnerSpeaker');
            expect(album.year).to.equal(2010);
            expect(album.artistId).to.equal(artist.id);
            done();
          });
        });
    });

    it('returns a 404 and does not create an album if the artist does not exist', (done) => {
      request(app)
        .post('/artists/1234/albums')
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The artist could not be found.');

          Album.findAll().then((albums) => {
            expect(albums.length).to.equal(0);
            done();
          });
        });
    });

    it('cannot create the album if there is no name or year', (done) => {
      request(app)
      .post(`/artists/${artist.id}/albums`)
      .send({})
      .then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors.length).to.equal(2);
        Album.findAll().then((albums) => {
          expect(albums.length).to.equal(0);
          done();
        });
    });
  });
  });


  describe('with albums in the database', () => {
    let albums;
    beforeEach((done) => {
      Promise.all([
        Album.create({ name: 'InnerSpeaker', year: 2010, artistId: artist.id }),
        Album.create({ name: 'TestAlbum', year: 2011, artistId: artist.id })
      ]).then((documents) => {
        albums = documents;
        done();
      });
    });
  
    describe('GET /albums', () => {
      it('gets all album records', (done) => {
        request(app)
          .get('/albums')
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(2);
            res.body.forEach((album) => {
              const expected = albums.find((a) => a.id === album.id);
              expect(album.name).to.equal(expected.name);
              expect(album.year).to.equal(expected.year);
            });
            done();
          });
      });
    });


  describe('GET artists/:artistId/albums', () => {
    it('gets all album records by artist id', (done) => {
      request(app)
        .get(`/artists/${artist.id}/albums`)
        .then((res) => {
          res.body.forEach((album) => {
            const expected = albums.find((a) => a.id === album.id);
            expect(album.name).to.equal(expected.name);
            expect(album.year).to.equal(expected.year);
          });
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('returns a 404 if the artist does not exist', (done) => {
      request(app)
        .get('/artists/12345/albums')
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The artist and album could not be found.');
          done();
        });
    });
  });
  describe('GET /albums/:albumId', () => {
    it('gets album record by album id', (done) => {
       const album = albums[0];
       request(app)
         .get(`/albums/${album.id}`)
         .then((res) => {
           expect(res.status).to.equal(200);
           expect(res.body.name).to.equal(album.name);
           expect(res.body.year).to.equal(album.year);
           expect(res.body.id).to.equal(album.id);
           done();
         });
     });
 
    it('returns a 404 if the artist does not exist', (done) => {
       request(app)
         .get('/albums/12345')
         .then((res) => {
           expect(res.status).to.equal(404);
           expect(res.body.error).to.equal('The album could not be found.');
           done();
         });
     });
   });
  describe('GET /albums', () => { 
    it('gets album records by year', (done) => {
       const album = albums[0];
       request(app)
         .get('/albums/year')
         .query({ year: '2010' })
         .then((res) => {
          expect(res.body[0].name).to.equal(album.name);
          expect(res.body[0].year).to.equal(album.year);
          expect(res.status).to.equal(200);
          done();
         });
     });
 
     it('returns a 404 if the artist does not exist', (done) => {
       request(app)
         .get('/albums/year')
         .query({ year: 0000 })
         .then((res) => {
           expect(res.status).to.equal(404);
           expect(res.body.error).to.equal('The album could not be found.');
           done();
         });
     });
   });
   describe('GET /albums', () => {
    it('gets album records by name', (done) => {
       const album = albums[0];
       request(app)
         .get(`/albums/find/name`)
         .query({ name: 'InnerSpeaker' })
         .then((res) => {
          expect(res.body[0].name).to.equal(album.name);
          expect(res.body[0].year).to.equal(album.year);
          expect(res.status).to.equal(200);
          done();
         });
     });
 
     it('returns a 404 if the artist does not exist', (done) => {
       request(app)
         .get('/albums/find/name')
         .query({ name: 'randomName' })
         .then((res) => {
           expect(res.status).to.equal(404);
           expect(res.body.error).to.equal('The album could not be found.');
           done();
         });
     });
   });
  describe('PATCH albums/:albumId', () => {
    it('updates album by album Id', (done) => {
      const album = albums[0];
      request(app)
        .patch(`/albums/${album.id}`)
        .send( { year: 2011 })
        .then((res) => {
          expect(res.status).to.equal(200);
              Album.findByPk(album.id).then((updatedAlbum) => {
                expect(updatedAlbum.year).to.equal(2011)
                done();
              });
    });
  })
  it('returns a 404 if the artist does not exist', (done) => {
    request(app)
      .patch('/albums/12345')
      .send({ year: 2011 })
      .then((res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('The album could not be found.');
        done();
      });
  });
});
describe('DELETE artists/:artistId/albums/:albumId', () => {
  it('deletes album record by album id', (done) => {
    const album = albums[0];
    request(app)
      .delete(`/albums/${album.id}`)
      .then((res) => {
        expect(res.status).to.equal(204);
        Album.findByPk(album.id).then((updatedAlbum) => {
          expect(updatedAlbum).to.equal(null)
          done();
        });
      });
  });
  it('returns a 404 if the artist does not exist', (done) => {
    request(app)
      .delete('/albums/12345')
      .then((res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('The album could not be found.');
        done();
      });
  });
});
describe('DELETE artists/albums/:albumId', () => {
  it('deletes album record by album id and name', (done) => {
    const album = albums[0];
    request(app)
      .delete(`/artists/albums/${album.id}`)
      .query({ name: 'InnerSpeaker' })
      .then((res) => {
        expect(res.status).to.equal(204);
        Album.findByPk(album.id).then((updatedAlbum) => {
          expect(updatedAlbum).to.equal(null)
          done();
        });
      });
  });
  it('returns a 404 if the artist does not exist', (done) => {
    request(app)
      .delete('/artists/albums/12345')
      .query({ name: 'randomName'})
      .then((res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('The album could not be found.');
        done();
      });
  });
});
describe('DELETE artists/:artistId/albums', () => {
 it('deletes all albums by artist Id', (done) => {
   request(app)
      .delete(`/artists/${artist.id}/albums`)
      .then((res) => {
        expect(res.status).to.equal(204);
        Album.findAll({ where: { artistId: artist.id }}).then((updatedAlbum) => {
        expect(updatedAlbum).to.deep.equal([]);
        done();
        });
      });
    })
  it('returns a 404 if the albums do not exist', (done) => {
   request(app)
      .delete('/artists/12345/albums')
      .then((res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('The album could not be found.');
        done();
      });
  });
});
});
  });