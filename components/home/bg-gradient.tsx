export default function BgGradient({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`relative isolate ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 
        -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30"
      >
        <div
          style={{
            clipPath:
              'polygon(50% 0%, 63% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 3% 35%, 35% 35%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] 
          w-[36.125rem] -translate-x-1/2 rotate-[30deg]
          bg-linear-to-tr from-emerald-500 via-teal-500 to-cyan-500 
          opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
        />
      </div>
      {children}
    </div>
  
  )
}
