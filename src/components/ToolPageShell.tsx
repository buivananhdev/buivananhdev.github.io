import type { ToolItem } from '@/lib/types/tool';

export function ToolPageShell({ tool, children }: { tool: ToolItem; children: React.ReactNode }) {
  return (
    <main className="page-shell tool-shell">
      <header className="tool-header">
        <div className="kicker">{tool.category.toUpperCase()}</div>
        <h1>{tool.title}</h1>
        <p>{tool.description}</p>
      </header>

      <section className="tool-panel">
        <div className="interactive-panel">{children}</div>
      </section>

      <article className="seo-content">
        <h2>{tool.seoTitle}</h2>

        <p>
          Công cụ này giúp bạn tính toán mã kiểm tra lỗi CRC-16 theo chuẩn Modbus RTU dựa trên
          chuỗi dữ liệu Hex. Kết quả được trả về ngay trên trình duyệt, không cần gửi dữ liệu tới
          backend và phù hợp với môi trường PLC, SCADA, MCU hay thiết bị công nghiệp.
        </p>

        <h3>CRC-16 Modbus hoạt động như thế nào?</h3>
        <p>
          Thuật toán Modbus CRC-16 bắt đầu từ giá trị ban đầu 0xFFFF. Sau đó, từng byte trong dữ
          liệu đầu vào sẽ được XOR với giá trị CRC hiện tại, rồi lặp 8 bit. Nếu bit thấp nhất là 1,
          giải thuật sẽ XOR với đa thức 0xA001 và dịch phải. Cách xử lý này giúp phát hiện sai sót
          trong truyền dữ liệu, đặc biệt khi giao tiếp các thiết bị công nghiệp và vi điều khiển.
        </p>

        <h3>Ví dụ tính toán</h3>
        <pre>Input: 01 03 00 00 00 02
Output CRC-16: 0xC0C1</pre>

        <h3>Cheat Sheet</h3>
        <ul>
          <li>Khởi tạo CRC ban đầu: 0xFFFF</li>
          <li>Đa thức chuẩn: 0xA001</li>
          <li>Bit vận hành: 8 lần/byte</li>
          <li>Định dạng hiển thị: HEX 4 ký tự</li>
          <li>LSB/MSB: hiển thị theo thứ tự thực tế để debug giao tiếp</li>
        </ul>

        <h3>FAQ</h3>
        <div className="faq-item">
          <strong>Có cần backend không?</strong>
          <p>Không. Tính toán được chạy hoàn toàn ở client side bằng JavaScript thuần.</p>
        </div>
        <div className="faq-item">
          <strong>Đầu vào có cần có khoảng trắng không?</strong>
          <p>Không bắt buộc. Bạn có thể nhập dạng 010300000002 hoặc 01 03 00 00 00 02.</p>
        </div>
        <div className="faq-item">
          <strong>Mục đích của CRC-16 trong Modbus là gì?</strong>
          <p>Nó giúp xác thực tính toàn vẹn dữ liệu trong gói truyền từ thiết bị tới PLC hoặc ngược lại.</p>
        </div>
      </article>
    </main>
  );
}
