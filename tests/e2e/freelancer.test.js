const app = require('../..')
const request = require('supertest')(app)
const { freelancerService, employerService, jobService, orderService } = require('../../services')

test('base service findby', async done => {
  const rv = await freelancerService.findBy('name', 'any name')

  expect(rv.length).toBe(0)

  done()
})

test('find by name', async done => {
  const rv = await freelancerService.findByName('any name')

  expect(rv.length).toBe(0)

  done()
})

test('freelancer false id processes', async done => {
  const fakeId = '600d1096124b784b00622a90'

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

  await request.post(`/freelancers/${fakeId}/jobs`).send(jobToCreate).expect(404)

  await request.patch(`/freelancers/${fakeId}/jobs/${jobResponse.body._id}`).send(jobToUpdate).expect(404)

  await request.patch(`/freelancers/${freelancerResponse.body._id}/jobs/${fakeId}`).send(jobToUpdate).expect(404)

  await request.get(`/freelancers/${fakeId}`).expect(404)

  await request
    .post(`/freelancers/${fakeId}/specialty`)
    .send({
      field: 'angular',
      experience: '3 years'
    })
    .expect(404)

  await request.delete(`/freelancers/${fakeId}/jobs/${jobResponse.body._id}`).expect(404)

  await request.delete(`/freelancers/${freelancerResponse.body._id}/jobs/${fakeId}`).expect(404)

  done()
})
