const app = require('../..')
const request = require('supertest')(app)

test('Creates a new order and deletes it', async done => {
  const employerToCreate = {
    name: 'Test employer'
  }

  const freelancerToCreate = {
    name: 'Test freelancer',
    country: 'Test country',
    description: 'Test description',
    specialties: [
      {
        field: 'Test field',
        experience: 'Test experience'
      }
    ]
  }

  const secondFreelancerToCreate = {
    name: 'Test freelancer 2',
    country: 'Test country 2',
    description: 'Test description 2',
    specialties: [
      {
        field: 'Test field 2',
        experience: 'Test experience 2'
      }
    ]
  }

  const jobToCreate = {
    title: 'Test Title',
    content: 'Test Content',
    price: 1337,
    deliveryTime: 37
  }

  const fakeId = '600d1096124b784b00622a90'

  const employerResponse = await request.post('/employers').send(employerToCreate).expect(200)

  const freelancerResponse = await request.post('/freelancers').send(freelancerToCreate).expect(200)

  const secondFreelancerResponse = await request.post('/freelancers').send(secondFreelancerToCreate).expect(200)

  const jobResponse = await request
    .post(`/freelancers/${freelancerResponse.body._id}/jobs`)
    .send(jobToCreate)
    .expect(200)

  const orderResponse = await request
    .post(`/employers/${employerResponse.body._id}/jobs/${jobResponse.body._id}`)
    .expect(200)

  const commentToBeMade = {
    rating: 3,
    text: 'not good'
  }

  await request
    .post(`/employers/${employerResponse.body._id}/jobs/${jobResponse.body._id}/comments`)
    .send(commentToBeMade)
    .expect(200)

  await request.patch(`/freelancers/${fakeId}/orders/${orderResponse.body._id}/status`).send({ status: 0 }).expect(404)

  await request
    .patch(`/freelancers/${freelancerResponse.body._id}/orders/${fakeId}/status`)
    .send({ status: 0 })
    .expect(404)

  await request
    .patch(`/freelancers/${secondFreelancerResponse.body._id}/orders/${orderResponse.body._id}/status`)
    .send({ status: 0 })
    .expect(404)

  await request
    .patch(`/freelancers/${freelancerResponse.body._id}/orders/${orderResponse.body._id}/status`)
    .send({ status: 0 })
    .expect(200)

  await request
    .patch(`/freelancers/${freelancerResponse.body._id}/orders/${orderResponse.body._id}/status`)
    .send({ status: 1 })
    .expect(200)

  await request
    .patch(`/freelancers/${freelancerResponse.body._id}/orders/${orderResponse.body._id}/status`)
    .send({ status: 2 })
    .expect(200)

  await request
    .patch(`/freelancers/${freelancerResponse.body._id}/orders/${orderResponse.body._id}/status`)
    .send({ status: 3 })
    .expect(200)

  await request
    .patch(`/freelancers/${freelancerResponse.body._id}/orders/${orderResponse.body._id}/status`)
    .send({ status: 4 })
    .expect(404)

  await request.get('/jobs').expect(200)

  await request.get(`/jobs/${jobResponse.body._id}`).expect(200)

  await request.get(`/jobs/${fakeId}`).expect(404)

  await request.get('/orders').expect(200)

  await request.get(`/orders/${orderResponse.body._id}`).expect(200)

  await request.get(`/orders/${fakeId}`).expect(404)

  await request.delete(`/employers/${employerResponse.body._id}`).expect(200)

  await request.delete(`/freelancers/${freelancerResponse.body._id}`).expect(200)

  await request.delete(`/freelancers/${secondFreelancerResponse.body._id}`).expect(200)

  done()
})
