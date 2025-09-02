'use client';

interface ContactFormButtonProps {
  isSubmitting: boolean;
  disabled?: boolean;
}

export default function ContactFormButton({ isSubmitting, disabled }: ContactFormButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || disabled}
      className={`
        py-3 px-8 rounded-md font-semibold transition duration-200
        ${isSubmitting || disabled
          ? 'bg-gray-400 cursor-not-allowed text-gray-200'
          : 'bg-primary-700 hover:bg-primary-900 text-white'
        }
      `}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>送信中...</span>
        </div>
      ) : (
        '送信する'
      )}
    </button>
  );
}
