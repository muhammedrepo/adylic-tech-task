import { useState, useEffect, useRef } from 'react'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import gsap from 'gsap'
import people from '../utils/data'
import { cta, logo } from '../assets'

interface CarouselProps {}

const Carousel: React.FC<CarouselProps> = () => {
  const [index, setIndex] = useState<number>(0)
  const { name, image } = people[index]
  const timeline = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    // Initialize GSAP timeline
    timeline.current = gsap.timeline({
      repeat: -1,
      defaults: { duration: 1.5, ease: 'easeInOut' },
    })

    // Create animation sequence
    timeline.current
      .to('.review-item', { opacity: 0.2 })
      .to('.review-item', { opacity: 1 })

    // Check if the timeline is at the end and reset it to the beginning
    const onUpdate = () => {
      if (timeline.current?.progress() === 1) {
        nextPerson()
        timeline.current.progress(0)
      }
    }

    timeline.current.eventCallback('onUpdate', onUpdate)

    // Auto-play timeline
    timeline.current.play()

    // Clean up GSAP animation on component unmount
    return () => {
      if (timeline.current) {
        timeline.current.kill()
      }
    }
  }, [index])

  const updateIndex = (newIndex: number) => {
    setIndex(checkNumber(newIndex))
  }

  const checkNumber = (number: number) => {
    if (number > people.length - 1) {
      return 0
    }
    if (number < 0) {
      return people.length - 1
    }
    return number
  }

  const nextPerson = () => {
    updateIndex(index + 1)
  }

  const prevPerson = () => {
    updateIndex(index - 1)
  }

  return (
    <div>
      {/* Carousel wrapper */}
      <div className="relative">
        <div className="duration-700 ease-in-out transition-all transform translate-x-0 z-20">
          <div className="flex flex-col items-center review-item">
            <div className="w-[300px] h-[444px]">
              <img className="shadow-lg" src={image} alt={name} />
              <div className="flex items-center justify-center absolute inset-0">
                <img
                  src={logo}
                  alt="logo"
                  width="199px"
                  height="63px"
                  className=""
                />
              </div>
            </div>
            <div className="w-[300px] h-[165px] mx-auto p-7 pb-8 bg-gray-200 flex flex-col items-center justify-center ">
              <div className="text-center max-w-[160px]">
                <h5 className="mb-4 text-[25px] sm:text-xl font-medium text-gray-900 font-custom">
                  {name}
                </h5>
                <a href="#">
                  <img
                    src={cta}
                    alt=""
                    className="w-[82px] h-2.5 mb-1 mx-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bottom-20">
        <button
          type="button"
          className="absolute left-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={prevPerson}>
          <span className="inline-flex items-center justify-center w-[20%] h-3 mt-[3.5px] mb-[73.5px] rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white  group-focus:outline-none">
            <FaChevronLeft />
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button
          type="button"
          className="absolute right-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={nextPerson}>
          <span className="inline-flex items-center justify-center w-[20%] h-3 mt-[3.5px] mb-[73.5px] rounded-full sm:w-10 sm:h-10 bg-white/30  group-hover:bg-white/50  group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <FaChevronRight />
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default Carousel
