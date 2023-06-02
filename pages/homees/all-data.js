import { useRouter } from 'next/router'

function AllData() {
  const router = useRouter()

  const handleClick = () => {
    // Navigate to /all-data
    router.push('/all-data')
  }

  return (
    <button onClick={handleClick}>
hello guys all-data
    </button>
  )
}

export default AllData;