/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const { Artist } = require('../src/sequelize');
const app = require('../src/app');

describe('/artists', () => {
  before(async () => {
    try {
      await Artist.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /artists', () => {
    it('creates a new artist in the database', (done) => {
      request(app)
      .post(`/artists`)
      .send({
        name: 'Tame Impala',
        genre: 'Rock',
      })
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal('Tame Impala');
        Artist.findByPk(res.body.id, { raw: true }).then(artist => {
          expect(artist.name).to.equal('Tame Impala');
          expect(artist.genre).to.equal('Rock');
          done();
        })
      })
    })
    xit('cannot create the artist if there is no name or genre', (done) => {
      request(app)
      .post(`/artists`)
      .send({})
      .then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors.length).to.equal(2);
        Artist.findAll().then((artists) => {
          expect(artists.length).to.equal(0);
          done();
        });
    });
  });
  });

  describe('with artists in the database', () => {
    let artists;
    beforeEach((done) => {
      Promise.all([
        Artist.create({ name: 'Tame Impala', genre: 'Rock' }),
        Artist.create({ name: 'Kylie Minogue', genre: 'Pop' }),
        Artist.create({ name: 'Dave Brubeck', genre: 'Jazz' }),
      ]).then((documents) => {
        artists = documents;
        done();
      });
    });

    describe('GET /artists', () => {
      it('gets all artist records', (done) => {
        request(app)
          .get('/artists')
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(3);
            res.body.forEach((artist) => {
              const expected = artists.find((a) => a.id === artist.id);
              expect(artist.name).to.equal(expected.name);
              expect(artist.genre).to.equal(expected.genre);
            });
            done();
          });
    });
  });

    describe('GET /artists/:artistId', () => {
      it('gets artist record by id', (done) => {
        const artist = artists[0];
        request(app)
          .get(`/artists/${artist.id}`)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(artist.name);
            expect(res.body.genre).to.equal(artist.genre);
            done();
          });
      });

      it('returns a 404 if the artist does not exist', (done) => {
        request(app)
          .get('/artists/12345')
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The artist could not be found.');
            done();
          });
      });
    });

    describe('GET /artists', () => {
      it('gets artist record by name', (done) => { 
        const artist = artists[0];
        request(app)
          .get(`/artists/find`)
          .query({ name: 'Tame Impala' })
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body[0].name).to.equal(artist.name);
            expect(res.body[0].genre).to.equal(artist.genre);
            done();
          });
      });

      it('returns a 404 if the artist does not exist', (done) => {
        request(app)
          .get(`/artists/find`)
          .query({ name: 'randomName' })
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The artist could not be found.');
            done();
          });
      });
    });
    describe('GET /artists', () => {
      it('gets artist records by genre', (done) => {
        const artist = artists[0];
        request(app)
        .get('/artists/find/genre')
        .query({ genre: 'Rock' })
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0].name).to.equal(artist.name);
          expect(res.body[0].genre).to.equal(artist.genre);
          done();
      })
    })
      it('returns a 404 if the artist with that genre does not exist', (done) => {
        request(app)
          .get(`/artists/find/genre`)
          .query({ genre: 'randomGenre' })
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The artist could not be found.');
            done();
          });
      });
  })

  describe('GET /artists', () => { 
    xit('gets an artist name that begins with specific letter', (done) => {
      const artist = artists[0];
      request(app)
      .get('/artists/find/letter')
      .query({name: 'T'})
      .then((res) => {
        expect(res.status).to.equal(200);
        console.log('test', res.body.name);
        expect(res.body[0].name).to.equal(artist.name);
        expect(res.body[0].genre).to.equal(artist.genre);
        done();
      });
    });
    xit('returns a 404 if the artist cannot be found', (done) => {
      request(app)
        .get(`/artists/find/letter`)
        .query({ name: 'Z' })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The artist could not be found.');
          done();
        });
    });
  })

    describe('PATCH /artists/:artistId', () => {
      xit('updates artist genre by id', (done) => {
        const artist = artists[0];
        request(app)
          .patch(`/artists/${artist.id}`)
          .send({ genre: 'Psychedelic Rock' })
          .then((res) => {
            expect(res.status).to.equal(200);
            Artist.findByPk(artist.id, { raw: true }).then((updatedArtist) => {
              expect(updatedArtist.genre).to.equal('Psychedelic Rock');
              done();
            });
          });
      });

      xit('returns a 404 if the artist does not exist', (done) => {
        request(app)
          .patch('/artists/12345')
          .send({ genre: 'Psychedelic Rock' })
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The artist could not be found.');
            done();
          });
      });
    });

    describe('PATCH /artists/:artistId', () => {
      xit('updates artist name by id', (done) => {
        const artist = artists[0];
        request(app)
          .patch(`/artists/${artist.id}`)
          .send({ name: 'Eminem' })
          .then((res) => {
            expect(res.status).to.equal(200);
            Artist.findByPk(artist.id, { raw: true }).then((updatedArtist) => {
              expect(updatedArtist.name).to.equal('Eminem');
              done();
            });
          });
      });

     xit('returns a 404 if the artist does not exist', (done) => {
        request(app)
          .patch('/artists/12345')
          .send({ name: 'Eminem' })
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The artist could not be found.');
            done();
          });
      });
    });

   

    describe('DELETE /artists/:artistId', () => {
      xit('deletes artist record by id', (done) => {
        const artist = artists[0];
        request(app)
          .delete(`/artists/${artist.id}`)
          .then((res) => {
            expect(res.status).to.equal(204);
            Artist.findByPk(artist.id, { raw: true }).then((updatedArtist) => {
              expect(updatedArtist).to.equal(null);
              done();
            });
          });
      });

      xit('returns a 404 if the artist does not exist', (done) => {
        request(app)
          .delete('/artists/12345')
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The artist could not be found.');
            done();
          });
      });
    });
  });
});
