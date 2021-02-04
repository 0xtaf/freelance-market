const app = require('..')
const request = require('supertest')(app)

test('employer activities', async done => {
  const employerToCreate = {
    name: 'Test employer'
  }

  const fakeId = '600d1096124b784b00622a90'

  const employerResponse = await request.post('/employers').send(employerToCreate).expect(200)

  await request.patch(`/employers/${employerResponse.body._id}`).send({ name: 'Updated name' }).expect(200)

  await request.get(`/employers/${employerResponse.body._id}`).expect(200)

  await request.get(`/employers/${fakeId}`).expect(404)

  await request.get('/employers').expect(200)

  await request.delete(`/employers/${employerResponse.body._id}`).expect(200)

  done()
})

test('exception test', async done => {
  const employerToCreate = {
    name: 'Test employer'
  }

  const commentToBeMade = {
    rating: 3,
    text: 'not good'
  }

  const fakeId = '600d1096124b784b00622a90'

  const employerResponse = await request.post('/employers').send(employerToCreate).expect(200)

  await request
    .post(`/employers/${employerResponse.body._id}/jobs/${fakeId}/comments`)
    .send(commentToBeMade)
    .expect(404)

  await request.delete(`/employers/${employerResponse.body._id}`).expect(200)

  done()
})
