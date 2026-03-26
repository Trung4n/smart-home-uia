import sys

def main():
    if len(sys.argv) < 2:
        print("Usage: python run.py <command>")
        return

    command = sys.argv[1]

    if command == "m":
        from mock.mock_device import run
        run()
    
    else:
        print(f"Unknown command: {command}")

if __name__ == "__main__":
    main()