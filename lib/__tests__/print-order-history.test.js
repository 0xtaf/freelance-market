const printOrderHistory = require('../print-order-history')

test("prints employer's orders", () => {
  const employer = {
    orders: [
      {
        employer: {
          name: 'tayfun'
        },
        job: {
          title: 'vuejs',
          price: 23,
          freelancer: {
            name: 'freelancer'
          }
        }
      }
    ]
  }

  const consoleSpy = jest.spyOn(console, 'log')
  printOrderHistory(employer)

  expect(consoleSpy).toHaveBeenCalledWith('tayfun bought vuejs for 23 dollars from freelancer')
  consoleSpy.mockRestore()
})

test('prints empty orders', () => {
  const employer = {
    name: 'tayfun',
    orders: []
  }

  const consoleSpy = jest.spyOn(console, 'log')
  printOrderHistory(employer)

  expect(consoleSpy).toHaveBeenCalledWith('tayfun has no orders yet')
  consoleSpy.mockRestore()
})
