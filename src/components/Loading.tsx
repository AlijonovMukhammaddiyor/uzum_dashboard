function Loading() {
  return (
    <div
      className='absolute inset-x-0 top-0 z-10 flex h-full w-full flex-row items-center justify-center backdrop-blur-sm'
      // style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 51 }}
    >
      <div className='loader'>Yuklanmoqda...</div>
    </div>
  );
}

export default Loading;
