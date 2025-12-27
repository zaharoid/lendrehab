export type Device = {
    id: string
    name: string
    type: string
    size: string
    availableFrom: string
    description: string
  }
  
  export type Reservation = {
    id: string
    citizenName: string
    email: string
    phone: string
    deviceId: string
    deviceName: string
    pickupSlot: string
    status: 'pending' | 'approved' | 'rejected'
  }
  
  const devices: Device[] = [
    {
      id: 'dev-1',
      name: 'Standard wheelchair 18"',
      type: 'wheelchair',
      size: '18"',
      availableFrom: '2025-03-12',
      description: 'Standard indoor wheelchair for adults (up to 110 kg).'
    },
    {
      id: 'dev-2',
      name: 'Lightweight wheelchair 18"',
      type: 'wheelchair',
      size: '18"',
      availableFrom: '2025-03-15',
      description: 'Lightweight frame, easier to transport, outdoor-friendly.'
    },
    {
      id: 'dev-3',
      name: 'Walker, size M',
      type: 'walker',
      size: 'M',
      availableFrom: '2025-03-10',
      description: 'Four-leg walker for indoor use.'
    }
  ]
  
  let reservations: Reservation[] = []
  
  export function useFakeApi() {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  
    async function searchDevices(filters: { type?: string; size?: string }) {
      await delay(300)
      return devices.filter(d => {
        return (!filters.type || d.type === filters.type) &&
               (!filters.size || d.size === filters.size)
      })
    }
  
    async function getDeviceById(id: string) {
      await delay(150)
      return devices.find(d => d.id === id) || null
    }
  
    async function createReservation(payload: {
      citizenName: string
      email: string
      phone: string
      pickupSlot: string
      deviceId: string
    }) {
      await delay(600)
  
      if (
        !payload.citizenName ||
        !payload.email ||
        !payload.phone ||
        !payload.pickupSlot
      ) {
        throw new Error('VALIDATION_ERROR')
      }
  
      const device = devices.find(d => d.id === payload.deviceId)
      if (!device) throw new Error('DEVICE_NOT_FOUND')
  
      const reservation: Reservation = {
        id: `res-${Math.random().toString(36).slice(2, 8)}`,
        citizenName: payload.citizenName,
        email: payload.email,
        phone: payload.phone,
        deviceId: device.id,
        deviceName: device.name,
        pickupSlot: payload.pickupSlot,
        status: 'pending'
      }
  
      reservations.push(reservation)
      return reservation
    }
  
    async function listPendingReservations() {
      await delay(300)
      return reservations.filter(r => r.status === 'pending')
    }
  
    async function getReservationById(id: string) {
      await delay(200)
      return reservations.find(r => r.id === id) || null
    }
  
    async function updateReservationStatus(id: string, status: Reservation['status']) {
      await delay(250)
      const res = reservations.find(r => r.id === id)
      if (!res) throw new Error('RESERVATION_NOT_FOUND')
      res.status = status
      return res
    }
  
    return {
      searchDevices,
      getDeviceById,
      createReservation,
      listPendingReservations,
      getReservationById,
      updateReservationStatus
    }
  }
  