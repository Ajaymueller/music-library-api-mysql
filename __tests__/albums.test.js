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
  });


  describe('with albums in the database', () => {
    let albums;
    beforeEach((done) => {
      Promise.all([
        Album.create({ name: 'InnerSpeaker', year: 2010, artistId: artist.id }),
        Album.create({ name: 'TestAlbum', year: 2010, artistId: artist.id })
      ]).then((documents) => {
        albums = documents;
        done();
      });
    });


  describe('GET artists/:artistId/albums', () => {
    it('gets album record by artist id', (done) => {
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
});
});