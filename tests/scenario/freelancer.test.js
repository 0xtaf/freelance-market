const app = require('../..')
const request = require('supertest')(app)

test('freelancer activities', async done => {
  const freelancerToCreate = {
    name: 'Test freelancer'
  }

  const jobToCreate = {
    title: 'Test Title',
    content: 'Test Content',
    price: 1337,
    deliveryTime: 37
  }

  const jobToUpdate = {
    title: 'Updated Title',
    content: 'Updated Content',
    price: 1338,
    deliveryTime: 38
  }

  const freelancerResponse = await request.post('/freelancers').send(freelancerToCreate).expect(200)

  const jobResponse = await request
    .post(`/freelancers/${freelancerResponse.body._id}/jobs`)
    .send(jobToCreate)
    .expect(200)

  await request
    .patch(`/freelancers/${freelancerResponse.body._id}/jobs/${jobResponse.body._id}`)
    .send(jobToUpdate)
    .expect(200)

  await request
    .patch(`/freelancers/${freelancerResponse.body._id}`)
    .send({ country: 'country', description: 'any description' })
    .expect(200)

  await request.get(`/freelancers/${freelancerResponse.body._id}`).expect(200)

  await request.get('/freelancers').expect(200)

  await request
    .post(`/freelancers/${freelancerResponse.body._id}/specialty`)
    .send({
      field: 'angular',
      experience: '3 years'
    })
    .expect(200)

  await request.get('/').expect(200)

  await request.get(`/search/test`).expect(200)

  await request.delete(`/freelancers/${freelancerResponse.body._id}/jobs/${jobResponse.body._id}`).expect(200)

  await request.delete(`/freelancers/${freelancerResponse.body._id}`).expect(200)

  done()
})
