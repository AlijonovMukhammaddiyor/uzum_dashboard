function Loading({ loadText }: { loadText?: string }) {
  return (
    <div
      className='absolute inset-x-0 top-0 z-10 flex h-full w-full flex-row items-center justify-center backdrop-blur-sm'
      // style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 51 }}
    >
      <div className='dot-spinner'>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
      </div>
      <span className='ml-8'>{loadText || 'Загрузка данных...'}</span>
    </div>
  );
}

export default Loading;
