/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album, Song } = require('../src/sequelize');

describe('/songs', () => {
  let artist;
  let album;

  before(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
      await Song.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      await Song.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      });
      album = await Album.create({
        name: 'InnerSpeaker',
        year: 2010,
        artistId: artist.id,
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /albums/:albumId/song', () => {
    it('creates a new song under an album', (done) => {
      request(app)
        .post(`/albums/${album.id}/song`)
        .send({
          artist: artist.id,
          name: 'Solitude Is Bliss',
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          const songId = res.body.id;
          expect(res.body.id).to.equal(songId);
          expect(res.body.name).to.equal('Solitude Is Bliss');
          expect(res.body.artistId).to.equal(artist.id);
          expect(res.body.albumId).to.equal(album.id);
          done();
        });
    });
    it('returns a 404 and does not create a song if the album does not exist', (done) => {
      request(app)
        .post('/albums/1234/song')
        .send({
          artist: artist.id,
          name: 'Solitude Is Bliss',
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The album could not be found.');

          Song.findAll().then((songs) => {
            expect(songs.length).to.equal(0);
            done();
          });
        });
    });
    it('cannot create the song if there is no name', (done) => {
      request(app)
      .post(`/albums/${album.id}/song`)
      .send({})
      .then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors.length).to.equal(1);
        Song.findAll().then((songs) => {
          expect(songs.length).to.equal(0);
          done();
        });
    });
  });
  });

  describe('with songs in the database', () => {
    let songs;
    beforeEach((done) => {
      Promise.all([
        Song.create({ name: 'Song1' , albumId: album.id, artistId: artist.id }),
        Song.create({ name: 'Song2' , albumId: album.id, artistId: artist.id })
      ]).then((documents) => {
        songs = documents;
        done();
      });
    });
    
    describe('GET /songs', () => {
      it('gets all song records', (done) => {
        const song = songs[0]
        request(app)
          .get('/song')
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(2);
            res.body.forEach((song) => {
              const expected = songs.find((a) => a.id === song.id);
              expect(song.name).to.equal(expected.name);
            });
            done();
          });
      });
    });

    describe('GET albums/:albumId/songs', () => {
      it('gets all songs by album id', (done) => {
        request(app)
          .get(`/albums/${album.id}/song`)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(2);
            const expected = ['Song1', 'Song2'];
            songs.forEach((song, index) => {
              expect(song.name).to.equal(expected[index]);
              expect(song.albumId).to.equal(album.id);
            });
            done();
          });
      });
     it('returns a 404 if the artist does not exist', (done) => {
        request(app)
          .get('/albums/12345/song')
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The song could not be found.');
            done();
          });
      });
    });
    describe('GET song/:songId', () => {
      it('gets song by song id', (done) => {
        const song = songs[0];
        request(app)
        .get(`/song/${song.id}`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(song.name);
          expect(res.body.id).to.equal(song.id);
          done();
        })
      })
      it('returns a 404 if the song does not exist', (done) => {
        request(app)
        .get(`/song/12345`)
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The song could not be found.');
          done();
        })
      })
    })
    describe('GET /song', () => {
      it('gets song where name contains a specific word', (done) => {
        const song = songs[0];
        request(app)
        .get('/song/find/word')
        .query({ name: 'Song'})
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0].name).to.equal(song.name);
          expect(res.body[0].year).to.equal(song.year);
          done();
        })
      })
      it('returns a 404 if the song does not exist', (done) => {
        request(app)
          .get(`/song/find/word`)
          .query({ name: 'randomName' })
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The song could not be found.');
            done();
          });
      });
    })
    describe('GET song', () => {
      it('gets songs by song name', (done) => {
        const song = songs[0];
        request(app)
        .get('/song/find/name')
        .query({ name: 'Song1' })
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0].name).to.equal(song.name);
          expect(res.body[0].year).to.equal(song.year);
          done();
        })
      })
      it('returns a 404 if the song does not exist', (done) => {
        request(app)
          .get(`/song/find/name`)
          .query({ name: 'randomName' })
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The song could not be found.');
            done();
          });
      });
    })
    describe('GET artists/:artistId/songs', () => {
      it('gets all songs by a specific artist id', (done) => {
        const song = songs[0];
        request(app)
        .get(`/artists/${artist.id}/songs`)
        .then((res) => {
          expect(res.body.length).to.equal(2);
          const expected = ['Song1', 'Song2'];
          res.body.forEach((song, index) => {
            expect(song.name).to.equal(expected[index]);
          });
          expect(res.status).to.equal(200);
          done();
        })
      })
      it('returns a 404 if the songs do not exist', (done) => {
        request(app)
          .get(`/artists/12345/songs`)
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The song could not be found.');
            done();
          });
      });
    })

describe('/song/:songId', () => {
  it('updates a song name by song id', (done) => {
    const song = songs[0];
    request(app)
    .patch(`/song/${song.id}`)
    .send({ name: 'song3'})
    .then((res) => {
      expect(res.status).to.equal(200);
          Song.findByPk(song.id).then((updatedSong) => {
            expect(updatedSong.name).to.equal('song3');
            done();
    })
  })
})
it('returns a 404 if the song does not exist', (done) => {
  request(app)
  .patch(`/song/12345`)
  .send({ name: 'randomName' })
  .then((res) => {
    expect(res.status).to.equal(404);
    expect(res.body.error).to.equal('The song could not be found.');
    done();
  })
})
});
describe('DELETE song/:songId', () => {
 it('deletes song by song id', (done) => {
    const song = songs[0];
    request(app)
      .delete(`/song/${song.id}`)
      .then((res) => {
        expect(res.status).to.equal(204);
        Song.findByPk(song.id).then((destroyedSong) => {
          expect(destroyedSong).to.equal(null)
          done();
        });
      });
  });
  it('returns a 404 if the artist does not exist', (done) => {
    request(app)
      .delete('/song/12345')
      .then((res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('The song could not be found.');
        done();
      });
  });
})
});
});
